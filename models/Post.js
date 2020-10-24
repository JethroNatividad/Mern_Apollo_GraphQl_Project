const { model, Schema } = require('mongoose');

const PostSchema = new Schema({
  username: String,
  body: String,
  title: String,
  createdAt: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = model('Post', PostSchema);
