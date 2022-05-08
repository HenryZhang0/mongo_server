const { MongoClient } = require("mongodb");
const Express = require("express");
const Cors = require("cors");

const BodyParser = require("body-parser");


const client = new MongoClient(
  "mongodb+srv://pog:321lester@cluster-0.zslaw.mongodb.net/movies?retryWrites=true&w=majority"
);
const server = Express();

server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));
server.use(Cors());

var collection;

server.get("/search", async (request, response) => {
  try {
    let result = await collection.aggregate([
        {
          "$search": {
            "index": "default",
            "autocomplete": {
              "query": `${request.query.term}`,
              "path": "title",
              "fuzzy": {
                "maxEdits": 2,
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

server.listen("3000", async () => {
  try {
    await client.connect();
    collection = client.db("movies").collection("metadata");
  } catch (e) {
    console.error(e);
  }
});
