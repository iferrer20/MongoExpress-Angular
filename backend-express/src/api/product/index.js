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

router.post('/', readUserJwt(false/* TODO: change to true when everything ready*/), ah(async (req, res) => {
  const { category, name, description, quality, state } = req.body;
  let product = new Product({
    owner: req.user._id,
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
  res.json(await req.params.product.toJSONFor(req.user));
}));

router.put('/:product', readUserJwt(true), ah(async (req, res) => {
  let product = req.params.product;

  if (product.owner !== req.user._id && req.user.privileges < 2) {
    /** Not allowed! */
    return res.sendStatus(403);
  }

  const allowedFields = ['category', 'name', 'description', 'quality', 'state'];
  for (const f of allowedFields) {
    if (f in req.body) {
      product[f] = req.body[f];
    }
  }

  await product.save();

  res.json(await req.params.product.toJSONFor(req.user));
}));

router.delete('/:product', ah(async (req, res) => {
  let product = req.params.product;

  if (product.owner !== req.user._id && req.user.privileges < 2) {
    /** Not allowed! */
    return res.sendStatus(403);
  }
  
  await Product.deleteOne({ _id: product._id });
  res.json({ ok: true });
}));

export default router;
