import { Router } from 'express';
import Product from '../../models/Product';
import { allResolved } from '../../utils';
import ah from 'express-async-handler'; /* asyncHandler */
import { readUserJwt } from '../../middlewares/read_user_jwt';

const router = Router();

router.param('product', ah(async (req, res, next, slug) => {
  let product = await Product.findOne({ slug })
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
  let [list, total] = await allResolved([
    Product.find()
      .populate({ path: 'category', select: '-_id slug shortName' })
      .exec(),
    Product.countDocuments().exec()
  ]);

  res.json({ list, total });
}));

router.post('/', ah(async (req, res) => {
  // TODO: check if current user is authorized
  const { category, name, description, quality, state } = req.body;
  let product = new Product({
    owner: null, // TODO
    category,
    name,
    description,
    quality,
    state
  });

  await product.save();

  res.json({ product, slug: product.slug });
}));

router.get('/:product', readUserJwt(), ah(async (req, res) => {
  res.json(req.params.product.toJSONFor(req.user));
}));

router.put('/:product', ah(async (req, res) => {
  // TODO: check if current user is owner or admin
  let product = req.params.product;

  const allowedFields = ['category', 'name', 'description', 'quality', 'state'];
  for (const f of allowedFields) {
    if (f in req.body) {
      product[f] = req.body[f];
    }
  }

  await product.save();

  res.json({ product, slug: product.slug });
}));

router.delete('/:product', ah(async (req, res) => {
  // TODO: check if current user is owner or admin
  await Product.deleteOne({ _id: req.params.product._id });
  res.json({ ok: true });
}));

export default router;
