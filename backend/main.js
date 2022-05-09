const { MongoClient, ObjectID } = require("mongodb");
require("dotenv").config();
const Express = require("express");
const Cors = require("cors");
const BodyParser = require("body-parser");
const { request } = require("express");
const port = process.env.PORT || 4000;



const mongo_key = process.env.MONGO_TOKEN;
const client = new MongoClient(
  "mongodb+srv://pog:321lester@cluster-0.zslaw.mongodb.net/test"
);
const server = Express();
server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));
server.use(Cors());
var collection;
var collection2;

server.get("/search", async (request, response) => {
    console.log("search request");
    title = request.query.term.replace(/_/g, ' ');
  try {
    //console.log(request.query.query);
    let result = await collection
      .aggregate([
        {
          $search: {
            index: "default1",
            autocomplete: {
              query: `${title}`,
              path: "title",
              fuzzy: {
                maxEdits: 1,
                prefixLength: 3,
              },
            },
          },
        },
        {
            $limit: 6
        }
      ])
      .toArray();
    response.send(result);
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

server.get("/get/:id", async (request, response) => {
  try {
    let result = await collection2.findOne({ id: parseInt(request.params.id) });
    response.send(result);
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});



server.get("/actormovies/:name", async (request, response) => {
  let name = request.params.name.replace(/_/g, ' ');
  //console.log(name);
try {
  let result = await collection2.find({
    actors: { $elemMatch: { name: name} },
  }).toArray();

  result.status = 0;

  response.send(result.map((m) => { return m.id}));
} catch (e) {
  //response.send({status:-1})

  response.status(500).send({ message: e.message });
}
});


server.get("/actor/:name", async (request, response) => {
    let name = request.params.name.replace(/_/g, ' ');
    //console.log(name);
  try {
    let result = await collection2.findOne({
      actors: { $elemMatch: { name: name} },
    });
    result.status = 0;
    //console.log(result);
    response.send(result);
  } catch (e) {
    response.send({status:-1})

    //response.status(500).send({ message: e.message });
  }
});

server.listen(port, async () => {
  try {
    await client.connect();
    collection = client.db("movies").collection("metadata");
    collection2 = client.db("movies").collection("credits");
  } catch (e) {
    console.error(e);
  }
});
