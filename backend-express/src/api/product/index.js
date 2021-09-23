import { Router } from 'express';
import { Schema } from 'mongoose';
import moongose from 'moongose';

const ProductSchema = new Schema({
    title: String,
    author: String,
    category: String
});
moongose.model(ProductSchema);


const router = Router();

router.get('/:id', async (req, res) => {
    res.json({
        status: 'okk'
    });
});

router.put('/', async () => {

});

export default router;
