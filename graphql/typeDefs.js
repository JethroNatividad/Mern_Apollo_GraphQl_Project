const { gql } = require('apollo-server');
//typedefinitions

module.exports = gql`
  type Post {
    username: String!
    body: String!
    title: String!
    id: ID!
    createdAt: String!
    comments: [Comment]!
    commentsCount: Int!
    likes: [Like]!
    likesCount: Int!
  }
  type Query {
    getPosts: [Post]!
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
  type Like {
    createdAt: String!
    username: String!
  }
  type Comment {
    body: String!
    id: ID!
    createdAt: String!
    username: String!
  }
  type Mutation {
    register(registerInput: registerInput): User!
    login(email: String!, password: String!): User!
    getPost(postId: ID!): Post!
    createPost(title: String!, body: String!): Post!
    deletePost(postId: ID!): String!
    updatePost(title: String!, body: String, postId: ID!): Post!
    likePost(postId: ID!): Post!
    createComment(body: String!, postId: ID!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`;
