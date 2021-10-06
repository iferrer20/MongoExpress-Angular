import { Router } from 'express';
import product from './product';
import category from './category';
import user from './user';

const router = Router();
router.use('/product/', product);
router.use('/category/', category);
router.use('/user/', user);

export default router;