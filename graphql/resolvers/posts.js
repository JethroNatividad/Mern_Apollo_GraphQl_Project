const Post = require('../../models/Post');
const checkAuth = require('../../util/checkAuth');
const checkOwnership = require('../../util/checkOwnership');
module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    getPost: async (_, { postId }, context, info) => {
      if (!postId) throw new Error('Please provide PostId');
      try {
        const post = Post.findById(postId);
        return post;
      } catch (error) {
        throw new Error('Post not found');
      }
    },
    createPost: async (_, { title, body }, context, info) => {
      const user = checkAuth(context);
      const newPost = new Post({
        title,
        body,
        user: user._id,
        createdAt: new Date().toISOString(),
        comments: [],
        likes: [],
        username: user.username,
      });
      const post = await newPost.save();
      context.pubsub.publish('NEW_POST', {
        newPost: post,
      });
      return post;
    },
    deletePost: async (_, { postId }, context, info) => {
      const user = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const isOwner = checkOwnership(user, post);
        if (isOwner) {
          await post.remove();
          return 'Post Removed';
        }
      } else {
        throw new Error('Post not found/deleted');
      }
    },
    updatePost: async (_, { body, title, postId }, context, info) => {
      const user = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const isOwner = checkOwnership(user, post);
        if (isOwner) {
          post.body = body;
          post.title = title;
          post.createdAt = new Date().toISOString();
          await post.save();
          return post;
        }
      } else {
        throw new Error('Post not found');
      }
    },
    likePost: async (_, { postId }, context, info) => {
      const user = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        //if user already liked post
        if (post.likes.find((like) => like.username === user.username)) {
          //unlike it
          post.likes = post.likes.filter(
            (like) => like.username !== user.username
          );
        } else {
          //if not, like it
          post.likes.push({
            username: user.username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else {
        throw new Error('Post not found');
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST'),
    },
  },
};
