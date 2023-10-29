import os, sys
from langchain.vectorstores import chroma
sys.path.append(os.getcwd())
from langchain.retrievers import ContextualCompressionRetriever
from backendPython.utils import *
from langchain.retrievers.document_compressors import LLMChainFilter
from langchain.schema import Document
db_path = 'backendPython\profile_database\info_db'
db = chroma.Chroma(embedding_function = Embedding(), persist_directory= db_path)


_filter = LLMChainFilter.from_llm(llm)

retriever = db.as_retriever(search_kwargs={"k": 5, 'fetch_k': 20}, return_source_documents=True)
compression_retriever = ContextualCompressionRetriever(base_compressor=_filter, base_retriever=retriever)



def get_profiles(query: str):
    results:List[Document] = compression_retriever.get_relevant_documents(query)
    print(query, results)
    companies_info = {}
    for i ,doc in enumerate(results):
        companies_info[i] = doc.metadata
    return companies_info


# print(get_profiles("Pandas, SQL, Python, NLP"))