const { MongoClient, ObjectID } = require("mongodb");
require('dotenv').config();
const Express = require("express");
const Cors = require("cors");
const BodyParser = require("body-parser");
const mongo_key = process.env.MONGO_TOKEN;
const { request } = require("express");
const client = new MongoClient(mongo_key);
const server = Express();
server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));
server.use(Cors());
var collection;
var collection2;



server.get("/search", async (request, response) => {
  try {
    console.log(request.query.query);
      let result = await collection.aggregate([
          {
              "$search": {
                "index": "default1",
                  "autocomplete": {
                      "query": `${request.query.term}`,
                      "path": "title",
                      "fuzzy": {
                          "maxEdits": 2,
                          "prefixLength": 3
                      }
                  }
              }
          }
      ]).toArray();
      response.send(result);
  } catch (e) {
      response.status(500).send({ message: e.message });
  }
});

server.get("/get/:id", async (request, response) => {
  try {
      let result = await collection2.findOne({ "id": parseInt(request.params.id) });
      response.send(result);
  } catch (e) {
      response.status(500).send({ message: e.message });
  }
});
server.listen("3000", async () => {
    try {
        await client.connect();
        collection = client.db("movies").collection("metadata");
        collection2 = client.db("movies").collection("credits");
    } catch (e) {
        console.error(e);
    }
});