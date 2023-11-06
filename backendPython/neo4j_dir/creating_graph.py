import langchain.graphs.neo4j_graph as neo4j_graph
import os
import sys
import ast
sys.path.append('backendPython')
from llms import *
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv()) # read local .env file
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate, FewShotPromptTemplate
from neo4j_dir.entities import get_nodes_chain


graph = neo4j_graph.Neo4jGraph(
  url = os.environ['NEO4J_URI'],
  username=os.environ['NEO4J_USERNAME'],
  password=os.environ['NEO4J_PASSWORD']
)
#__________________________________________________________________________________________________

# giving few-shot prompts
examples = [
    {'Query' : 'name 10 companies which came for cgpa below 7' , 
     'syntax' : '''MATCH (c:Company)-[Company_to_CGPA]->(cgpa:CGPA) 
                  WHERE cgpa.name < 7 
                  RETURN c.name LIMIT 10'''},

    {"Query": "The ctc recieved by students for cgpa below 6", 
     "syntax": '''MATCH (cgpa:CGPA)-[CGPA_to_CTC]->(ctc:CTC)
                  WHERE cgpa.name < 6
                  RETURN ctc '''},
]

example_formatter_template = """
Query : 
{Query}
Cypher Syntax : 
{syntax}
"""
example_prompt = PromptTemplate(
    input_variables=['Query','syntax'],
    template=example_formatter_template,
)

prefix = ''' 

You are supposed to convert the following natural query into a cypher query for neo4j database
You can refer to  below examples for getting idea of how to write cypher query for neo4j database.

'''

suffix = '''
create a cypher query for following  natural query for neo4j database

The query has the following nodes :
    1) 'source_node'  : {source} ---> property : name
    2) 'destination_node' : {destination} ---> property : name
    
Relations : 
{source}_to_{destination}

natural_query :
{natural_query}

Do not put back-ticks(`) in the output.
Use only nodes provided , don't create your new nodes and relations.
 '''


few_shot_prompt = FewShotPromptTemplate( 
    examples=examples,

    # prompt template used to format each individual example
    example_prompt=example_prompt,

    # prompt template string to put before the examples, assigning roles and rules.
    prefix=prefix ,
    
    # prompt template string to put after the examples.
    suffix=suffix ,
    
    # input variable to use in the suffix template
    input_variables=["source", "destination" , "natural_query"],
    example_separator="\n", 
)


cypher_chain = LLMChain(llm=llm, prompt=few_shot_prompt,verbose=False,)
#__________________________________________________________________________________________________
# cypher = cypher_chain.run({'source': 'Company', 'destination': 'CGPA', 'natural_query':'name 10 companies which came for cgpa below 7'})

# result = graph.query(cypher)
# print(result)

#__________________________________________________________________________________________________
result_template = '''

You will be provided with the response generated for the given user query.

Response :
{response}

You need to format the respone in html in a conversational way, arrange the response in bulleted points 
and under major headings if possible. 


Take care that you do not pollute the data provided in response, by adding your own data.
Check that html syntax is correct.
'''

result_prompt = PromptTemplate(input_variables=['response'], template=result_template)

result_chain = LLMChain(llm=llm, prompt=result_prompt)
# print(result_chain.run({'response': result}))

#__________________________________________________________________________________________________

def get_response(query):
    li = get_nodes_chain.run(query)
    # print(li)
    if type(li)==str:
        li = ast.literal_eval(li) 
    source , destination = li[0] , li[1]

    cypher = cypher_chain.run({'source': source, 'destination': destination, 'natural_query':query})
    print('\n\n\n', cypher,'\n\n\n')
    result = graph.query(cypher)
    print('\n\n\n', result)
    response = result_chain.run({'response': result})
    print('\n\n\n', response)
    return response


# x = get_response('what ctc is offered for cgpa below 7, sort the ctc in descending order')
# print(x)

Y = '''
MATCH (c:Company)-[:Company_to_CTC]->(ctc:CTC)
WHERE ctc.name > 10
RETURN c.name


'''
x = graph.query(Y)
print(x)