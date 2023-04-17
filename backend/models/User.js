const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
    type: String,
    required: true
  },
	email: {
    type: String,
    required: true,
    lowercase: true
  },
	hashedPassword: {
    type: String,
    required: true
  },
  // following: [ mongoose.SchemaTypes.ObjectId ],
	// followers: [ mongoose.SchemaTypes.ObjectId ],
	// favorites: [ artworkSchema ]
}, {
  timestamps: true
});

userSchema.methods.addFollower = function() {
  console.log('add friend function');
}

userSchema.methods.removeFollower = function() {
  console.log('remove friend function');
}

userSchema.methods.addFavorite = function() {
  console.log('add favorite function');
}

userSchema.methods.removeFavorite = function() {
  console.log('remove favorite function');
}

module.exports = mongoose.model("User", userSchema);