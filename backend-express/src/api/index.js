import { Router } from 'express';
import product from './product';
import category from './category';

const router = Router();
router.use('/product/', product);
router.use('/category/', category);

export default router;
