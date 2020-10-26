//resolvers
const posts = require('./posts');
const users = require('./users');
const comments = require('./comments');
// exports everyting
module.exports = {
  Post: {
    commentsCount: (parent) => parent.comments.length,
    likesCount: (parent) => parent.likes.length,
  },
  Query: {
    ...posts.Query,
  },
  Mutation: {
    ...posts.Mutation,
    ...users.Mutation,
    ...comments.Mutation,
  },
  Subscription: {
    ...posts.Subscription,
  },
};
