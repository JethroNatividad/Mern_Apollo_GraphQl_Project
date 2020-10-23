const { gql } = require('apollo-server');
module.exports = gql`
  type Post {
    username: String!
    body: String!
    title: String!
    id: ID!
    createdAt: String
  }
  type Query {
    getPosts: [Post]
  }
  input registerInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type User {
    username: String!
    id: ID!
    email: String!
    createdAt: String!
    token: String!
  }
  type Mutation {
    register(registerInput: registerInput): User!
  }
`;
