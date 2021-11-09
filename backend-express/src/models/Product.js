import mongoose from 'mongoose';
import Category from './Category';
import { uniqueValidator } from '../utils';

const ObjectId = mongoose.Schema.Types.ObjectId;

const field = (type, required = true) => ({ type, required });
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

productSchema.methods.view = async function() {
  this.views++;
  await this.save();
}

productSchema.methods.toJSONFor = function (user) {
  const product = this.toJSON();
  
  if (user) {
    product.owner = this.owner ? this.owner.toJSONFor(user) : null;
    product.isFavorited = user.hasFavorite(this);
  }
  
  return product;
};

export default mongoose.model('Product', productSchema);
