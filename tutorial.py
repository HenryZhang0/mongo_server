from re import L
import ssl
import pymongo
from pymongo import MongoClient

cluster = MongoClient("mongodb+srv://pog:321lester@cluster-0.zslaw.mongodb.net/test")


db = cluster["tiktok"]
collection = db["userdata"]

post = {"name": "henry", "score" : 5}
post1 = {'name': "joe", "score" : 10}
post2 = {'name': "ryan", "score" : 99}
post3 = {'name': "tim", "score" : 1}
# collection.insert_many([post, post1])

# results = collection.insert_many([post, post1, post2, post3])
# results = collection.find({"name": "e"})
results = collection.update_many({"name": "jim"}, {"$set": {"score": -2}}) # you can also add fields with update

results = collection.update_many({"name": "henry"}, {"$inc": {"looks": -100}})

post_count = collection.count_documents({})
print(post_count) #hoho
