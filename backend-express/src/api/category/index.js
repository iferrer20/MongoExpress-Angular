import { Router } from 'express';
import Category from '../../models/Category';
import { allResolved } from '../../utils';
import ah from 'express-async-handler'; /* asyncHandler */

const router = Router();

router.param('category', ah(async (req, res, next, slug) => {
  var category = await Category.findOne({ slug })
    .exec();

  if (!category) {
    return res.sendStatus(404);
  }

  req.params.category = category;
  next();
}));

router.get('/', ah(async (req, res) => {
  let [list, total] = await allResolved([
    Category.find().exec(),
    Category.countDocuments().exec()
  ]);

  // data = data.map(cat => cat.toJSON()); // not needed: toJSON automatically called

  res.json({ list, total });
}));

router.post('/', ah(async (req, res) => {
  // TODO: check if current user is admin
  const { shortName, description, iconName } = req.body;
  let category = new Category({
    shortName,
    description,
    iconName
  });

  try {
    await category.validate();
  } catch (e) {
    // A category already exists with this slug or short name, reject creation
    return res.sendStatus(409);
  }

  await category.save();

  res.json({ category, slug: category.slug });
}));

router.get('/:category', ah(async (req, res) => {
  res.json({ category: req.params.category });
}));

router.put('/:category', ah(async (req, res) => {
  // TODO: check if current user is admin
  const { shortName, description, iconName } = req.body;
  let category = req.params.category;

  category.shortName = shortName;
  category.description = description;
  category.iconName = iconName;

  category.slug = category.v_slug;

  try {
    await category.validate();
  } catch (e) {
    // A category already exists with this slug or short name, reject creation
    return res.sendStatus(409);
  }

  await category.save();

  res.json({ category, slug: category.slug });
}));

router.delete('/:category', ah(async (req, res) => {
  // TODO: check if current user is admin
  await Category.deleteOne({ _id: req.params.category._id });
  res.json({ ok: true });
}));

export default router;
