const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'Please list a username!',
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: 'Please list a username!',
      match: [/.+@.+\..+/],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

UserSchema.virtual('friendCount').get(function () {
  return this.friends.reduce(
    (total, friend) => total + friend.count.length + 1,
    0
  );
});

const User = model('User', UserSchema);

module.exports = User;
