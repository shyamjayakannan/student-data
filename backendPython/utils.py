from chromadb.api.types import Documents, Embeddings
from typing import List
import yaml
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
