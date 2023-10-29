from langchain.agents import Tool
from langchain.utilities.google_search import GoogleSearchAPIWrapper
from prompts import *
from llms import *
from parsers import *
from chains import *
from profile_retrivers import *
from neo4j_dir.creating_graph import graph_chain

# wolfram = WolframAlphaAPIWrapper()
search = GoogleSearchAPIWrapper()

task_tools = [
    # Tool(
    # name="Google Search",  
    # description="Use when the user wants to search something on web instead of relying on database. Use it when user insists on searching something on web.", 
    # func=search.run,  
    # return_direct=False, 
    # handle_tool_error=True,  
    # ),
    Tool(
    name = "Graph DataBase" , 
    description='''For answering general queries related to placements, companies , cgpa, 
    selected ect. and there combination as a query.
    Use this tool more often as it is more reliable and fast for queries related to above topics.
    ''',
    func = graph_chain.run,
    return_direct = True, 
    handle_tool_error=True,
    ),
]