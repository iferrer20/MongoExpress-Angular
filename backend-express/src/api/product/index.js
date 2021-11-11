import { response, Router } from 'express';
import Product from '../../models/Product';
import { allResolved, checkJWT } from '../../utils';
import ah from 'express-async-handler'; /* asyncHandler */
import { readUserJwt } from '../../middlewares/read_user_jwt';
import Category from '../../models/Category';
import User from '../../models/User';
import Comment from '../../models/Comment';
import fs from 'fs/promises';
import { mkdirSync } from 'fs';
import path from 'path';

const productimgdir = path.dirname(require.main.filename) + '/../img/product/';

// Make sure the image directory exists
mkdirSync(productimgdir, {recursive: true});

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

router.get('/', readUserJwt(true), ah(async (req, res) => {

  // Filters
  const { text, category, quality, order, page } = req.query;

  async function products(getcount) {
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
      .addFields({owner: {
        '$map': {
          input: '$owner',
          as: 'usr',
          in: {
            id: "$$usr._id",
            username: "$$usr.username"
          }
        }
      }})
      .unwind('$owner');

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
    if (!getcount) {
      return q.skip(6 * (page-1)).limit(6).exec();
    } else {
      const res = (await q.count("total").exec())[0];
      return res ? res.total : 0;
    }
  }
  let [list, total] = await Promise.all([
    products(),
    products(true)
  ]);

  if (req.user) {
    list = list.map(prod => (prod.isFavorited = req.user.favorites.includes(prod._id), prod));
  }

  res.json({ list, total });
}));

router.post('/', readUserJwt(), ah(async (req, res) => {
  const { category, name, description, quality, state } = req.body;
  const { image } = req.files;

  let product = new Product({
    owner: req.user._id,
    category,
    name,
    description,
    quality,
    state,
    image: !!image
  });

  await product.save();
  if (image) {
    await fs.writeFile(productimgdir + product.slug, image.data);
  }
  res.json({ product, slug: product.slug });
}));

router.get('/:product', readUserJwt(), ah(async (req, res) => {
  await req.params.product.view();
  res.json(await req.params.product.toJSONFor(req.user));
}));

router.put('/:product', readUserJwt(true), ah(async (req, res) => {
  let product = req.params.product;

  if (!(product.owner._id.toString() === req.user._id.toString() || req.user.privileges >= 2)) {
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

router.delete('/:product', readUserJwt(false), ah(async (req, res) => {
  let product = req.params.product;

  if (!(product.owner._id.toString() === req.user._id.toString() || req.user.privileges >= 2)) {
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

router.get('/image/:slug', ah(async (req, res) => {
  const { slug } = req.params;
  res.sendFile(path.resolve(productimgdir + slug));
}));

export default router;
