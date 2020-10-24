const { AuthenticationError } = require('apollo-server');
module.exports = (user, thing) => {
  if (user.username === thing.username) {
    return true;
  } else {
    throw new AuthenticationError('Not authorized');
  }
};
