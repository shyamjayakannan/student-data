from langchain.agents import AgentType
from langchain.agents import Tool
import os, sys
sys.path.append(os.getcwd())
from prompts import *
from llms import *
from parsers import *
from langchain.utilities import GoogleSearchAPIWrapper
from langchain.utilities.wolfram_alpha import WolframAlphaAPIWrapper
from langchain.tools import tool, BaseTool
from langchain.callbacks.manager import (
    AsyncCallbackManagerForToolRun,
    CallbackManagerForToolRun,
)
from retrivers import *
from typing import Optional, Type

wolfram = WolframAlphaAPIWrapper()
search = GoogleSearchAPIWrapper()


class CustomSearchTool(BaseTool):
    name = "Coal Mines"
    description = "provides useful info regarding coal mines rules, regulations and provisions."
    return_direct = True
    def _run(
        self,
        query: str,
        run_manager: Optional[CallbackManagerForToolRun] = None,
    ) -> str:
        """Use the tool."""
        results:List[Document] = compression_retriever.get_relevant_documents(query)
        print('\n\n\nRadhe Shyam\n\n\n')

        return self.__formatting__(results)
    
    def __formatting__(self, docs:List[Document])->str:
        sources = set()
        text = ''
        references = '\n\nReferences : \n'
        for doc in docs:
            text += '\n\n' + doc.page_content + '\n\n'
            references +=  doc.metadata['source'] + '\n'
        formatted_text = formatting_chain.run(text)
        formatted_text += references
        return formatted_text

    async def _arun(
        self,
        run_manager: Optional[AsyncCallbackManagerForToolRun] = None,
    ) -> str:
        """Use the tool asynchronously."""
        raise NotImplementedError("custom_search does not support async")


single_task_tools = [
    CustomSearchTool(),
    Tool(
    name="Wolfram Calculator",  
    description="To do calculations.",  
    func=wolfram.run,   
    ),
    Tool(
    name="Google Search",  
    description="Search Google for recent results.", 
    func=search.run,  
    return_direct=True,   
    ),
]

