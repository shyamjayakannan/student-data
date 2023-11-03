import os
import sys 
sys.path.append(os.getcwd())
from backendPython.utils import *

db_path = 'backendPython/info_db'

docs = []

web_links = [
        'https://msmc.gov.in/eng/pdf/The%20Payment%20of%20Wages%20(Mines)%20Rules,%201956.pdf' ,
        'https://labour.gov.in/sites/default/files/theminesact1952.pdf',
        'https://www.indiacode.nic.in/bitstream/123456789/15371/1/the_explosives_act%2C_1884.pdf', 
        'https://coal.nic.in/sites/default/files/2019-11/Colliery_control_order_0_0.pdf' ,
        'http://www.bareactslive.com/ACA/ACT752.HTM' , 
        'http://www.dgms.net/Coal%20Mines%20Regulation%202017.pdf' ,
        


        
        ]
local_path_links = [
        'backendPython/info_db/data/The_Payment_of_Wages_(Mines)_Rules_1956.pdf',
        'backendPython/info_db/data/theminesact1952.pdf' , 
        'backendPython/info_db/data/the_explosives_act,_1884.pdf', 
        'backendPython/info_db/data/Colliery_control_order_2000.pdf' ,
        'http://www.bareactslive.com/ACA/ACT752.HTM',
        'backendPython/info_db/data/Coal_Mines_Regulation_2017.pdf' , 
]
        

for x, y in zip(web_links, local_path_links):
    docs.append({'web_path': x, 'local_path': y})

g = GetText(docs, db_path)
g.create_vectorestore()


