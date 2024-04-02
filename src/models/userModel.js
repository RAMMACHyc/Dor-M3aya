const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    file: { type: String, required: [true, "please"] },
    tele: {
      type: String,
      required: [true, 'Please add a telephone number'],
    },
    username: {
      type: String,
      required: [true, 'Please add a username'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)