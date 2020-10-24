const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

require('dotenv').config();
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('> Database connected');
    server
      .listen({ port: 8000 })
      .then((res) => console.log('> Server running at ' + res.url));
  });
