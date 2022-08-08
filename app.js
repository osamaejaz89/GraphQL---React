const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");


const graphqlSchema = require('./graphql/schema/index.js')
const graphqlResolver = require('./graphql/resolvers/index.js')

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGE_USER}:${process.env.MONGO_PASSWORD}@cluster0.coqohse.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
