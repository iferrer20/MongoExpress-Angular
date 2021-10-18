import mongoose from 'mongoose';
import Category from './Category';
import { uniqueValidator } from '../utils';

const ObjectId = mongoose.Schema.Types.ObjectId;

const field = (type, required = true) => ({ type, required });
const productSchema = mongoose.Schema({
  /* TODO: make owner required when profiles are implemented */
  owner: { ...field(ObjectId, false), ref: 'Profile' },
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
    slug: this.slug
  };
};

productSchema.methods.toJSONFor = async function (user) {
  return {
    id: this._id,
    owner: await this.owner.toJSONFor(user),
    category: this.category,
    name: this.name,
    description: this.description,
    quality: this.quality,
    datePublished: this.datePublished,
    views: this.views,
    likes: this.likes,
    slug: this.slug,
    isFavorited: await user.hasFavorite(this)
  };
};

export default mongoose.model('Product', productSchema);
