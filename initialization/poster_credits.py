import ast
import json
import pymongo
from pymongo import MongoClient

cluster = MongoClient(
    "mongodb+srv://pog:321lester@cluster-0.zslaw.mongodb.net/test")


db = cluster["movies"]
collection = db["credits"]

post = {"name": "henry", "score": 5}

# results = collection.insert_many([post, post1, post2, post3])
# results = collection.find({"name": "e"})
results = collection.update_many({"name": "jim"}, {"$set": {"score": -2}}) # you can also add fields with update
results = collection.update_many({"name": "henry"}, {"$inc": {"looks": -100}})

post_count = collection.count_documents({})
print(post_count) #hoho

import csv
mydict = {}
with open('credits.csv', mode='r', encoding="utf8") as infile:
    reader = csv.reader(infile)
    with open('credits_new.csv', mode='w', encoding="utf8") as outfile:
        writer = csv.writer(outfile)
        for i, rows in enumerate(reader):
            try:
                mydict[i] = {"actors":ast.literal_eval(rows[0]), "id" : ast.literal_eval(rows[1])}
                #mydict[i]["id"] = ast.literal_eval(rows[1])
            except:
                print('lol', i)

with open('credits1.json', 'w') as outfile:
    json.dump(mydict, outfile)

'''      
with open('credits.json', "r") as json_file:
    my_dict = json.load(json_file)
    keys = list(my_dict.keys())[0:1]
    for key in keys:
        cast_dict = my_dict[key]['cast']
        my_dict[key].pop('cast')
        cast_dict.update(my_dict[key])
        print(cast_dict)
    #collection.insert_one(my_dict[new_shit])
'''
#print(mydict)
print("uploading data")
new_shit = list(mydict.keys())
for i in new_shit:
    collection.insert_one(mydict[i])

print('done')