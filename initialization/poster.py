import json
import pymongo
from pymongo import MongoClient

cluster = MongoClient(
    "mongodb+srv://pog:321lester@cluster-0.zslaw.mongodb.net/test")


db = cluster["movies"]
collection = db["metadata"]

post = {"name": "henry", "score": 5}

# results = collection.insert_many([post, post1, post2, post3])
# results = collection.find({"name": "e"})
results = collection.update_many({"name": "jim"}, {"$set": {"score": -2}}) # you can also add fields with update
results = collection.update_many({"name": "henry"}, {"$inc": {"looks": -100}})

post_count = collection.count_documents({})
print(post_count) #hoho


with open('file.json', "r") as json_file:
    my_dict = json.load(json_file)
    new_shit = list(my_dict.keys())[18875:]
    for x in new_shit:
        collection.insert_one(my_dict[x])

