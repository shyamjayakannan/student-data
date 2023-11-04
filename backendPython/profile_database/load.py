import pickle


file = pickle.load(open('backendPython/profile_database/skill_set.pkl', 'rb'))
print('\n\n\n' , file)