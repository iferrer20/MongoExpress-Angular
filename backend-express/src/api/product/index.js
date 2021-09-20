import { Router } from "express";

const router = Router();

router.get('/:id', async (req, res) => {
    res.json({
        status: 'okk'
    });
});

router.put('/', async () => {

});

export default router;