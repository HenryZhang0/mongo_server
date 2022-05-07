import ssl
import pymongo
from pymongo import MongoClient

cluster = MongoClient(
    "mongodb+srv://pog:321lester@cluster-0.zslaw.mongodb.net/test")


db = cluster["tiktok"]
collection = db["userdata"]

post = {"name": "henry", "score": 5}

collection.insert_one(post)
