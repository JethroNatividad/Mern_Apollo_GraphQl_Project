const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { UserInputError } = require('apollo-server');
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../util/validators');
const generateToken = (user) =>
  jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.SECRET,
    { expiresIn: '9h' }
  );
module.exports = {
  Mutation: {
    async login(_, { email, password }, context, info) {
      const { valid, errors } = validateLoginInput(email, password);
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      //check if email is registered
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new UserInputError('User not found', {
          errors: {
            email: 'User not found',
          },
        });
      }
      //unhash the password
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        throw new UserInputError('Wrong Credentials', {
          errors: {
            password: 'Wrong Credentials',
          },
        });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, password, confirmPassword, email } },
      context,
      info
    ) {
      // validate fields
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }
      //check if user exist
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        throw new UserInputError('Email is taken', {
          errors: {
            email: 'This email already exists',
          },
        });
      }
      //hash password
      password = bcrypt.hashSync(password, 12);

      const newUser = new User({
        username,
        password,
        email,
        createdAt: new Date().toISOString(),
      });

      const user = await newUser.save();
      //generate jwt
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
