const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

require('dotenv').config();
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
