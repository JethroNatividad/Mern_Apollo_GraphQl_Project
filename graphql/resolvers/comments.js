const Post = require('../../models/Post');
const checkAuth = require('../../util/checkAuth');
const checkOwnership = require('../../util/checkOwnership');
module.exports = {
  Mutation: {
    createComment: async (_, { body, postId }, context, info) => {
      const user = checkAuth(context);
      const post = await Post.findById(postId).catch((error) => {
        throw new Error('Cannot add comment to invalid post');
      });
      if (post) {
        const newComment = {
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
        };
        post.comments.unshift(newComment);
        await post.save();
        return post;
      }
    },
    deleteComment: async (_, { postId, commentId }, context, info) => {
      const user = checkAuth(context);
      const post = await Post.findById(postId).catch((error) => {
        throw new Error('Post not found');
      });
      if (post) {
        let commentIdx = -1;
        post.comments.map((c, i) => {
          if (c.id === commentId) commentIdx = i;
        });

        if (commentIdx === -1) throw new Error('Comment not found');
        console.log(commentIdx);
        const isOwner = checkOwnership(user, post.comments[commentIdx]);
        if (isOwner) {
          post.comments.splice(commentIdx, 1);
          await post.save();
          return post;
        }
      }
    },
  },
};
