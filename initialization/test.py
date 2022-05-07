import ssl
import pymongo
from pymongo import MongoClient

cluster = MongoClient(
    "mongodb+srv://pog:321lester@cluster-0.zslaw.mongodb.net/test")


db = cluster["movies"]
collection = db["credits"]


# results = collection.insert_many([post, post1, post2, post3])
results = collection.find({"release_date": {"$regex": "2012"}})
results1 = collection.find({"actors": {"$elemMatch": {"name": "Tom Hanks"}}})
'''
results = collection.update_many({"name": "jim"}, {"$set": {"score": -2}}) # you can also add fields with update

results = collection.update_many({"name": "henry"}, {"$inc": {"looks": -100}})

post_count = collection.count_documents({})
print(post_count) #hoho
'''
for doc in results1:
    print(doc)