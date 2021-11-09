import mongoose from 'mongoose';
import Category from './Category';
import { uniqueValidator } from '../utils';

const ObjectId = mongoose.Schema.Types.ObjectId;

const field = (type, required = true) => ({ type, required });

const ratingSchema = mongoose.Schema({
  from: { ...field(ObjectId), ref: 'User' },
  rating: { ...field(Number), min: 0, max: 5 }
});

const productSchema = mongoose.Schema({
  owner: { ...field(ObjectId), ref: 'User' },
  category: { ...field(ObjectId), ref: 'Category' },
  name: field(String),
  description: field(String),
  quality: {
    ...field(String),
    enum: ['New', 'LikeNew', 'MinorDamages', 'Decrepit', 'Broken'],
    default: 'LikeNew'
  },
  state: {
    ...field(String),
    enum: ['Available', 'Reserved', 'Sold'],
    default: 'Available'
  },
  datePublished: { ...field(Date), default: Date.now },
  views: { ...field(Number), default: 0 },
  likes: { ...field(Number), default: 0 },
  ratings: [ratingSchema],
  slug: { ...field(String), unique: true, default: function () { return this.v_slug; } }
});

productSchema.path('category').validate(async value => {
  return await Category.findById(value);
}, 'Category does not exist');

productSchema.virtual('v_slug')
  .get(function () {
    return this.datePublished.getTime() + '-'
      + this.name.toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/--+/g, '-');
  });

productSchema.path('slug')
  .validate(uniqueValidator('slug'), 'Slug already exists');

ratingSchema.methods.toJSON = function () {
  return {
    from: this.from,
    rating: this.rating
  };
};

productSchema.methods.toJSON = function () {
  return {
    id: this._id,
    owner: this.owner,
    category: this.category,
    name: this.name,
    description: this.description,
    quality: this.quality,
    datePublished: this.datePublished,
    views: this.views,
    likes: this.likes,
    rating: this.ratings.reduce((avg, r) => avg + r.rating, 0) / Math.max(this.ratings.length, 1),
    slug: this.slug
  };
};

productSchema.methods.toJSONFor = function (user) {
  const product = this.toJSON();
  
  if (user) {
    product.owner = this.owner ? this.owner.toJSONFor(user) : null;
    product.isFavorited = user.hasFavorite(this);
    const ownRating = this.ratings.find(r => r.from.toString() === user._id.toString());
    product.userRating = ownRating ? ownRating.rating : null;
  }
  
  return product;
};

productSchema.methods.view = async function() {
  this.views++;
  await this.save();
};

productSchema.methods.rate = async function(user, amount) {
  await Product.updateOne({_id: this._id}, { /** remove existing rating (if any) */
    $pull: {
      ratings: {
        from: user._id
      }
    }
  });

  if (amount !== 0) {
    await Product.updateOne({_id: this._id}, { /** add new the one */
      $push: {
        ratings: {
          from: user._id,
          rating: amount
        }
      }
    });
  }
};

const Product = mongoose.model('Product', productSchema);
export default Product;
