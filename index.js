const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');
require('dotenv').config();
const typeDefs = gql`
  type Query {
    sayHi: String!
    sayHello: String!
  }
`;
const resolvers = {
  Query: {
    sayHi: () => 'Hi, It works.',
    sayHello: () => 'Hello, It works.',
  },
};

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
