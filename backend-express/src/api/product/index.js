import { Router } from 'express';
import Product from '../../models/Product';
import { allResolved } from '../../utils';
import ah from 'express-async-handler'; /* asyncHandler */

const router = Router();

router.param('product', ah(async (req, res, next, slug) => {
    let product = await Product.findOne({slug})
            /*.populate('owner')*/
            .populate('category')
            .exec();

    if (!product) {
        return res.sendStatus(404);
    }

    req.params.product = product;
    next();
}));

router.get('/', ah(async (req, res) => {
    let [ data, total ] = await allResolved([
        Product.find()
            .populate({path: 'category', select: '-_id slug shortName'})
            .exec(),
        Product.countDocuments().exec()
    ]);

    res.json({data, total});
}));

router.post('/', ah(async (req, res) => {
    // TODO: check if current user is authorized
    const {category, priceEurCent, name, description, quality} = req.body;
    let product = new Product({
        owner: null, // TODO
        category,
        priceEurCent,
        name,
        description,
        quality
    });

    await product.save();

    res.json({product, slug: product.slug});
}));

router.get('/:product', ah(async (req, res) => {
    res.json({product: req.params.product});
}));

router.put('/:product', ah(async (req, res) => {
    // TODO: check if current user is owner or admin
    const {category, priceEurCent, name, description, quality} = req.body;
    let product = req.params.product;

    product.category = category;
    product.priceEurCent = priceEurCent;
    product.name = name;
    product.description = description;
    product.quality = quality;
    await product.save();

    res.json({product, slug: product.slug});
}));

router.delete('/:product', ah(async (req, res) => {
    // TODO: check if current user is owner or admin
    await Product.deleteOne({_id: req.params.product._id});
    res.json({ok: true});
}));

export default router;
