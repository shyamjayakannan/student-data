import langchain.graphs.neo4j_graph as neo4j_graph
import os
import sys
sys.path.append('backendPython')
from llms import *
from langchain.chains import GraphCypherQAChain
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv()) # read local .env file

graph = neo4j_graph.Neo4jGraph(
  url = os.environ['NEO4J_URI'],
  username=os.environ['NEO4J_USERNAME'],
  password=os.environ['NEO4J_PASSWORD']
)

graph_chain = GraphCypherQAChain.from_llm(
   llm = llm, graph=graph, verbose=True, return_direct=False,validate_cypher=True,
)
# input = {'query': }
print(graph_chain.run(''))