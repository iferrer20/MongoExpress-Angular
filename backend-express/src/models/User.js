import mongoose, { Schema } from 'mongoose';
import { createHash } from '../utils';

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
  password: field(String)

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

userSchema.methods.toJSONFor = viewer => {
  let user = {uid: this._id, ...this};
  delete user.password;
  delete user._id;
  
  if (this._id == viewer._id) {
    user.hasPassword = !!user.password;
  } else {
    //user.isFollowing = 
  }

  return user;
};

export default mongoose.model('User', userSchema);

