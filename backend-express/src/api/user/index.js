import { Router } from 'express';
import ah from 'express-async-handler'; /* asyncHandler */
import User from '../../models/User';
import { OAuth2Client } from 'google-auth-library';
import { checkJWT, genJWT } from '../../utils';

const client = new OAuth2Client();
const router = Router();

function sendJWT(res, user) {
  const { _id } = user;
  const token = genJWT({ _id , exp: Math.floor((Date.now() + 7*24*60*60*1000)/1000)});

  res.cookie('token', token, {maxAge: 7*24*60*60*1000 }); // 1 week
}
router.post('/signin/', ah(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    $or: [
      { username },
      { email: username },
    ]
  });

  if (!user || !user.comparePassword(password))
    throw new Error('Invalid username or password');

  sendJWT(res, user);
  res.json(user.toJSONFor(user));
}));

router.post('/social_signin/', ah(async (req, res) => {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID
  });

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

  sendJWT(res, user);
  res.json(user.toJSONFor(user));
}));

router.param('user', ah(async (req, res, next, username) => {
  let user = await User.findOne({ username }).exec();

  if (!user) {
    return res.sendStatus(404);
  }

  req.params.user = user;
  next();
}));

router.get('/@:user', ah(async (req, res) => {
  res.json(req.params.user.toJSONFor());
}));

router.use('/', ah(async (req, res, next) => {
  // Veryify token
  const { token } = req.cookies;
  const { _id } = checkJWT(token);

  req.user = await User.findOne({_id}).exec();
  next();
}));

router.post('/follow/', ah(async (req, res) => {
  const { _id } = req.body;
  req.user.follow(_id);
  res.end();
}));

export default router;