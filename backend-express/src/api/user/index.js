import { Router } from 'express';
import ah from 'express-async-handler'; /* asyncHandler */
import User from '../../models/User';

const router = Router();

router.post('/signin/', ah(async (req, res) => {
    const { username, password, email } = req.body;
    const user = await User.findOne({username});
    
    if (!user || !user.comparePassword(password)) 
        throw new Error('Invalid username or password');

    res.end();
}));


router.post('/signup/', ah(async (req, res) => {
    const { username, email, password } = req.body;

    const user = new User({
        username,
        email,
        password
    });

    user.save();

    res.end();
}));


export default router;