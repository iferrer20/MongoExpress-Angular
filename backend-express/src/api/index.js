import { Router } from 'express';
import product from './product';
import category from './category';
import user from './user';
import { getEpCounter} from '../utils';
import client from 'prom-client';
import ah from 'express-async-handler'; /* asyncHandler */

client.collectDefaultMetrics({timeout: 5000});

const router = Router();
router.use('/product/', product);
router.use('/category/', category);
router.use('/user/', user);

router.get('/metrics', ah(async (req, res) => {getEpCounter('getMetricsApi').inc();
   res.set('Content-Type', client.register.contentType);
   res.end(await client.register.metrics());
}));

export default router;
