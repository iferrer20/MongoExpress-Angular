import mongoose, { Schema } from 'mongoose';
import { createHash } from '../utils';
import Product from './Product';

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
    type: [{ type: ObjectId, ref: 'User' }]
  },
  following: {
    type: [{ type: ObjectId, ref: 'User' }]
  },
  favorites: {
    type: [{ type: ObjectId, ref: 'Product' }]
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

userSchema.methods.toJSON = async function () {
  const user = { ...this.toObject() };
  delete user.password;
  delete user.__v;

  user.karma = (await Product.aggregate()
    .match({ owner: this._id })
    .unwind('ratings')
    .group({
      _id: '$owner',
      avg: { '$avg': '$ratings.rating' },
      num: { '$sum': 1 }
    })
    .exec())[0] || { avg: 0, num: 0 };

  user.favorites = (await User.aggregate()
    .match({ _id: this._id })
    .lookup({
      from: Product.collection.name,
      localField: 'favorites',
      foreignField: '_id',
      as: 'favorites'
    })
    .project({favorites: {
      '$map': {
        input: '$favorites',
        as: 'fav',
        in: {
          name: "$$fav.name",
          state: "$$fav.state",
          slug: "$$fav.slug"
        }
      }
    }})
    //.option({$slice: ['$favorites', 3]}) //limit array, doesn't work
    .exec())[0].favorites;
  
  delete user.karma._id;

  user.id = user._id;
  delete user._id;

  return user;
};

userSchema.methods.toJSONFor = async function (viewer) {
  const user = { ...(await this.toJSON()) };

  user.followers = user.followers.length;
  user.following = user.following.length;

  return user;
};

userSchema.methods.follow = async function (_id) {
  await User.updateOne({ _id }, { $addToSet: { followers: this._id, following: _id } });
}

const tsession = (() => {
  var session = null;
  return async () => {
    return session || (session = await mongoose.startSession({}));
  }
})();

userSchema.methods.favorite = async function (product) {
  const s = await tsession();
  await s.withTransaction(async () => {
    const isFavved = await User.aggregate()
      .match({ _id: this._id })
      .unwind('favorites')
      .match({ favorites: product._id })
      .exec();

    const op = isFavved[0] ? '$pull' : '$addToSet';
    const inc = isFavved[0] ? -1 : 1;
    await User.updateOne({ _id: this._id }, { [op]: { favorites: product._id } });
    await Product.updateOne({ _id: product._id }, { '$inc': { likes: inc } });
  });
};

userSchema.methods.hasFavorite = function (product) {
  return this.favorites.includes(product._id);
};

const User = mongoose.model('User', userSchema);
export default User;