from chromadb.api.types import Documents, Embeddings
from typing import List, Tuple
from langchain.docstore.document import Document
from newspaper import Article 
import requests
from langchain.vectorstores import Chroma
import yaml
from langchain.document_loaders import PyPDFLoader
from langchain.document_loaders import Docx2txtLoader
from langchain.text_splitter import SpacyTextSplitter, RecursiveCharacterTextSplitter
import os, sys
sys.path.append(os.getcwd())
from backendPython.llms import *
from chains import *

models = [m for m in palm.list_models() if 'embedText' in m.supported_generation_methods]
model = models[0]

#_________________________________________________________________________________________
class Embedding:
  def __init__(self):
    self.embedder = palm


  def embed_documents(self, texts: Documents) -> Embeddings:
    # Embed the documents using any supported method
    return  [self.embedder.generate_embeddings(model=model, text=text)['embedding']
            for text in texts]
  
  def embed_query(self,query):
    return  self.embedder.generate_embeddings(model=model, text=query)['embedding']


#_________________________________________________________________________________________
def load_config(CONFIG_PATH):
    with open(CONFIG_PATH, 'r') as f:
        config = yaml.safe_load(f)
    return config 

config = load_config('backendPython/config.yaml')
#_________________________________________________________________________________________

class GetText:
  def __init__(self , documents:List[dict] , db_path:str):
    self.text_splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=16, length_function=len,)
    self.documents = documents
    self.db = Chroma(embedding_function = Embedding(), persist_directory= db_path)
    self.ct = 0
    # self.db.from_texts(texts=['Hare Krishna'],embedding_function = Embedding(),metadatas= [{'title': 'Hare Krishna'}])


  def __load_data__(self, web_path , path)->List[dict]:
    type = path.split('.')[-1]

    title = None
    result = []    # to store list of dict of {text , metadata}
    if type == 'pdf':
      document_loader = PyPDFLoader(file_path=path)
      docs = document_loader.load()
    elif type == 'docx':
      loader = Docx2txtLoader(file_path=path)
      docs = loader.load()

    else :
      title , text = self.__web_scraping__(path)
      if title is None :
        return None
      docs = [Document(page_content=text , metadata={'title':title})]

    for doc in docs:
      texts = self.text_splitter.split_text(doc.page_content)

      for text in texts:
        metadata = self.__get_metadata__(web_path , text)  
        if 'page' not in doc.metadata:
          metadata['page'] = -1
        else :
          metadata['page'] = doc.metadata['page']
        result.append({'text':text , 'metadata':metadata})
    
    return result

  def get_metadata(self, path , text)->dict:
    # summary , path_url , title , keywords
    metadata = {}
    metadata['source'] = path

    try:
      metadata['title'] = title_chain.run(text)
    except Exception as e:
      metadata['title'] = "No title found"
      self.ct+=1
      print(self.ct)
    
    try:
      metadata['summary'] = short_summary_chain.run(text)
    except Exception as e:
      metadata['summary'] = "No summary found"
      self.ct+=1
      print(self.ct)
    return metadata
  

  def __web_scraping__(self, url):
    headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
            }
    session = requests.Session()

    try:
      response = session.get(url, headers=headers, timeout=10)
    
      if response.status_code == 200:     # the request was successful
        article = Article(url)
        article.download()
        article.parse()
        
        print('All fetching successful!', end= '\n\n\n')
        return article.title, article.text
      else:
        print(f"Failed to fetch article at {url}")
    except Exception as e:
      print(f"Error occurred while fetching article at {url}: {e}") 
    
    return  None, None
  
  def create_vectorestore(self):

    print('Entered create_vectorestore...\n\n')
    for idx, dict_1 in enumerate(self.documents):

      local_path = dict_1['local_path']
      web_path = dict_1['web_path']
      print(f'Loading doc:{idx+1}' , end ='  ')

      
      x = self.__load_data__(web_path, local_path)
      texts = []
      meta = []
      print('Appending to list...', end= '  ')
      for dict_2 in x:
        texts.append(dict_2['text'])
        meta.append(dict_2['metadata'])
        
      self.db.add_texts(texts, meta)
      print(u'\u2705')

    

