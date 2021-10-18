import mongoose from 'mongoose';
import { uniqueValidator } from '../utils';

const field = (type, required = true) => ({ type, required });
const categorySchema = mongoose.Schema({
  shortName: { ...field(String), unique: true },
  description: field(String),
  iconName: field(String),
  slug: {...field(String), unique: true, default: function() { return this.v_slug; }}
});

categorySchema.virtual('v_slug') // virtuals are useless
  .get(function () {
    return this.shortName.toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
  });

categorySchema.path('shortName')
  .validate(uniqueValidator('shortName'), 'Short name already exists');

categorySchema.path('slug')
  .validate(uniqueValidator('slug'), 'Slug already exists');

categorySchema.methods.toJSON = function () {
  return {
    id: this._id,
    shortName: this.shortName,
    description: this.description,
    iconName: this.iconName,
    slug: this.slug
  };
};

export default mongoose.model('Category', categorySchema);
