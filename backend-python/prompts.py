from langchain.prompts import PromptTemplate
import os, sys
sys.path.append(os.getcwd())
from backendPython.parsers import *


summary_template= ''''
Write a summary of the following text in bulleted points: 
Format Instructions:
{format_instructions}

Query : 
{query}

''' 
summary_prompt = PromptTemplate(
    input_variables=["query"],
    template=summary_template,
    partial_variables={"format_instructions": summary_parser.get_format_instructions()}
)



short_summary_template= ''''

Summarise the following text :

{text}
'''

short_summary_prompt = PromptTemplate(
    input_variables=["text"],
    template=short_summary_template,
)

title_template= ''''
Write a descriptive title of the following text:

Text: {text}
'''

title_prompt = PromptTemplate(
    input_variables=["text"],
    template=title_template,
)
#_________________________________________________________________________________________
formatting_template = '''

You are a smart and polite bot who is concerned regarding improving readibility.
You should not change the facts and meaning of the text and try arranging text under major headings and bulleted points if possible.


User Input: 

{text}

'''
formatting_prompt = PromptTemplate(
    input_variables=["text"],
    template=formatting_template,
)