import { response, Router } from 'express';
import Product from '../../models/Product';
import { allResolved, checkJWT } from '../../utils';
import ah from 'express-async-handler'; /* asyncHandler */
import { readUserJwt } from '../../middlewares/read_user_jwt';
import Category from '../../models/Category';
import User from '../../models/User';
import Comment from '../../models/Comment';

const router = Router();

router.param('product', ah(async (req, res, next, slug) => {
  let product = await Product.findOne({ slug })
    .populate([
      { path:'owner' }, 
      { path: 'category' },
      {
        path: 'comments',
        populate: {
          path: 'user'
        }
      }
    ]).exec();

  if (!product) {
    return res.sendStatus(404);
  }

  req.params.product = product;
  next();
}));

router.get('/', ah(async (req, res) => {

  // Filters
  const { text, category, quality, order, page } = req.query;

  var q = Product.aggregate()
    .lookup({
      from: Category.collection.name,
      localField: 'category',
      foreignField: '_id',
      as: 'category'
    })
    .lookup({
      from: User.collection.name,
      localField: 'owner',
      foreignField: '_id',
      as: 'owner'
    })
    .unwind('$category')
    .unwind('$owner')
    .addFields({owner: '$owner.username'});

  if (text) {
    var regex = {
      '$regex': text.toString().replace(/[#-.]|[[-^]|[?|{}]/g, '\\$&'),
      '$options': 'i'
    };

    q.match({'$or': [{description: regex}, {name: regex}]});
  }

  if (category) {
    q.match({ 'category.shortName': category });
  }

  if (quality) {
    q.match({ quality });
  }

  if (order == 'FavFirst') {
    q.sort({
      'likes': -1
    });
  } else if (order == 'ViewsFirst') {
    q.sort({
      'views': -1
    });
  } else if (order == 'NewFirst') {
    q.sort({
      'datePublished': -1
    });
  }

  let [list, total] = await allResolved([
    q.skip(6 * (page - 1))
    .limit(6)
    .exec()
    ,
    q.model().find().merge(q).countDocuments()
  ]);

  res.json({ list, total });
}));

router.post('/', readUserJwt(), ah(async (req, res) => {
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
  await req.params.product.view();
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

router.post('/like/:product', readUserJwt(false) , ah(async (req, res) => {
  await req.user.favorite(req.params.product); 
  res.end();
}));

router.post('/rate/:product', readUserJwt(false) , ah(async (req, res) => {
  const value = +req.body.value;
  if (isNaN(value) || value > 5 || value < 0) {
    return req.sendStatus(400);
  }

  await req.params.product.rate(req.user, value);
  res.end();
}));

router.param('comment', ah(async (req, res, next, _id) => {
  const comment = await Comment.findOne({ _id })
    .populate('user')
    .exec();

  if (!comment) {
    return res.sendStatus(404);
  }

  req.params.comment = comment;
  next();
}));

router.post('/comment/:product', readUserJwt(false), ah(async (req, res) => {
  const comment = await req.params.product.comment(req.user, req.body);
  res.json(await comment.toJSON());
}));

router.delete('/comment/:product/:comment', readUserJwt(false), ah(async (req, res) => {
  await req.params.comment.delete(req.user);
  res.end();
}));

export default router;
