import mongoose, { Schema } from 'mongoose';
import { createHash } from '../utils';

const ObjectId = mongoose.Schema.Types.ObjectId;
const field = (type, required = true) => ({ type, required });

const userSchema = mongoose.Schema({
  username: {
    type: String,
    min: [4, 'Username too short'],
    max: [16, 'Username too long'],
    match: [/^[a-zA-Z0-9]+$/, 'Username invalid'],
    required: [true, 'can\'t be blank'],
    lowercase: true,
    unique: true
  },
  email: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    required: 'Email address is required',
    unique: true,
    lowercase: true,
    trim: true
  },
  location: new Schema({
    lat: field(Number),
    lon: field(Number)
  }),
  password: field(String),
  privileges: { 
    ...field(Number),
    default: 0
  },
  followers: {
    type: [{type: ObjectId, ref:'User'}]
  },
  following: {
    type: [{type: ObjectId, ref:'User'}]
  },
  favorites: {
    type: [{type: ObjectId, ref: 'Product'}]
  }
}, { toJSON: { virtuals: true } });

userSchema.methods.comparePassword = function (password) {
  const [salt, hash] = this.password.split(':');
  return createHash(salt, password) === hash;
}
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  const password = this.password;
  const salt = (Math.random() + 1).toString(36).substring(2);

  this.password = salt + ':' + createHash(salt, password);
  next();
});

userSchema.methods.toJSONFor = function (viewer) {
  const user = {...this.toObject()};

  user.followers = user.followers.length;
  user.following = user.following.length;
  delete user.password;
  delete user.__v;

  return user;
};

userSchema.methods.follow = async function(_id) {
  await User.updateOne({_id}, {$addToSet: {followers: this._id, following: _id}});
}

userSchema.methods.hasFavorite = async function (product) {
  return false; /** TODO: implement */
};

const User = mongoose.model('User', userSchema);
export default User;