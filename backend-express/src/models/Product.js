import mongoose from 'mongoose';
import Category from './Category';

const ObjectId = mongoose.Schema.Types.ObjectId;

const field = (type, required = true) => ({type, required});
const productSchema = mongoose.Schema({
    /* TODO: make owner required when profiles are implemented */
    owner: {...field(ObjectId, false), ref: 'Profile'},
    category: {...field(ObjectId), ref: 'Category'},
    priceEurCent: field(Number),
    name: field(String),
    description: field(String),
    quality: {
        ...field(String),
        enum: ['New', 'LikeNew', 'MinorDamages', 'Decrepit', 'Broken'],
        default: 'LikeNew'
    },
    datePublished: {...field(Date), default: Date.now()},
    views: {...field(Number), default: 0},
    likes: {...field(Number), default: 0}
}, {toJSON: {virtuals: true}});

productSchema.path('category').validate(async value => {
    return await Category.findById(value);
}, 'Category does not exist');

productSchema.virtual('slug')
    .get(function() {
        return this.datePublished.getTime() + '-'
                + this.name.toLowerCase()
                        .replace(/[^a-z0-9]/g, '-')
                        .replace(/--+/g, '-');
    });


export default mongoose.model('Product', productSchema);
