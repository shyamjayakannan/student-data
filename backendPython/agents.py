from langchain.agents import ZeroShotAgent, AgentExecutor
from chat_tools import *
from langchain.memory import ConversationSummaryBufferMemory
from chains import title_chain
from langchain.agents import initialize_agent
from langchain.agents import AgentType

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
        )
        # memory
        self.memory = ConversationSummaryBufferMemory(llm = llm ,memory_key="chat_history", 
                                                      moving_summary_buffer = self.history['chat_summary'])
        
        # agent
        self.agent = initialize_agent(
                                task_tools,
                                llm,
                                agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
                                verbose=True,
                                return_intermediate_steps=True,
                                )

    def run(self, query):
        try:
            response = self.agent(query)
            return response
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

Agent = PersonalAgent()

x = Agent.run('name companies which offered ctc above 20')
print('\n\n\n\n', x['intermediate_steps'])
# y = agent_chain.run('10 companies which offered ctc above 20')
# print('\n\n\n\n', y)
# print(agent_chain.get_chat_summary())
