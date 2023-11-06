from langchain.agents import ZeroShotAgent, AgentExecutor
from chat_tools import *
from langchain.memory import ConversationSummaryBufferMemory
from chains import title_chain

class PersonalAgent:
    def __init__(self, history= {'title' : '' , 'chat_summary' : ''}):

        self.history = history
        self.prefix = """Have a conversation with a human, answering the following questions as best you can. You have access to the following tools:"""
        self.suffix = """Begin!

        {chat_history}
        Question: {input}
        {agent_scratchpad}"""

        self.task_prompt = ZeroShotAgent.create_prompt(
            task_tools,
            prefix=self.prefix,
            suffix=self.suffix,
            input_variables=["input", "chat_history", "agent_scratchpad"],
            # format_instructions = 
        )
        # memory
        self.memory = ConversationSummaryBufferMemory(llm = llm ,memory_key="chat_history", 
                                                      moving_summary_buffer = self.history['chat_summary'])

        self.llm_chain = LLMChain(llm=llm, prompt=self.task_prompt)
        
        # agent
        self.agent = ZeroShotAgent(llm_chain=self.llm_chain, tools=task_tools, verbose=True)
        self.agent_chain = AgentExecutor.from_agent_and_tools(
            agent=self.agent, tools=task_tools, 
            verbose=True, memory=self.memory, handle_parsing_errors=True,
        )

    def run(self, query):
        try:
            # print('**')
            ans =  get_response(query)
            return ans
        except Exception as e:
            print(e)
        return "I did not get that. Please try again."

    def get_chat_summary(self):
        messages = self.memory.chat_memory.messages
        old_memory = self.history['chat_summary']
        self.history['chat_summary'] = self.memory.predict_new_summary(messages, self.history['chat_summary'])
        if old_memory == '':
            self.history['title'] = title_chain.run(self.history['chat_summary'])
        
        return self.history

# agent_chain = PersonalAgent()

# x = agent_chain.run("name companies which offered work location as Delhi")
# print('\n\n\n\n', x)