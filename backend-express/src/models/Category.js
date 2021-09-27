import mongoose from 'mongoose';

const field = (type, required = true) => ({type, required});
const categorySchema = mongoose.Schema({
    shortName: field(String),
    description: field(String),
    iconName: field(String)
});

categorySchema.virtual('slug')
    .get(() => {
        return this.shortName.toLowerCase()
                .replace(/[^a-z0-9]/g, '-');
    });

export default mongoose.model('Category', categorySchema);
