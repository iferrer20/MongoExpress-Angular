import { Router } from 'express';
import ah from 'express-async-handler'; /* asyncHandler */
import User from '../../models/User';
import { OAuth2Client } from 'google-auth-library';
import { genJWT } from '../../utils';

const client = new OAuth2Client();
const router = Router();

router.post('/signin/', ah(async (req, res) => {
<<<<<<< Updated upstream
  const { userOrEmail, password } = req.body;
  const user = await User.findOne({
    $or: [
      { username: userOrEmail },
      { email: userOrEmail },
    ]
  });

  if (!user || !user.comparePassword(password))
    throw new Error('Invalid username or password');

  res.end(user.toJSONFor(user));
}));

router.post('/social_signin/', ah(async (req, res) => {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  });
=======
    const { username, password, email } = req.body;
    const user = await User.findOne({username});

    if (!user || !user.comparePassword(password)) 
        throw new Error('Invalid username or password');
    
    const { _id } = user;
    const token = genJWT({ _id });

    res.cookie("admin_token", token, {maxAge: (24 * 60 * 60 * 1000 * 7) }); // 7 days expiration
    res.end();
}));

router.post('/social_signin/', ah(async (req, res) => {
    const { token } = req.body;
>>>>>>> Stashed changes

  let { username, email, picture } = ticket.getPayload();
  username = username.replace(' ', '_') + '_' + Math.floor(Math.random() * 1000);

  if (!await User.findOne({ email })) {
    const user = new User({
      username,
      email,
      password: ''
    });
    await user.save();
  }

  res.json(ticket.getPayload());
}));

router.post('/signup/', ah(async (req, res) => {
  const { username, email, password } = req.body;

  const user = new User({
    username,
    email,
    password
  });

  await user.validate();
  await user.save();

  res.end();
}));


export default router;