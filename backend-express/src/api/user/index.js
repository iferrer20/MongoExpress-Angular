import { Router } from 'express';
import ah from 'express-async-handler'; /* asyncHandler */
import User from '../../models/User';
import { OAuth2Client } from 'google-auth-library';
import { genJWT } from '../../utils';
import { readUserJwt } from '../../middlewares/read_user_jwt';
import fs from 'fs/promises';
import { mkdirSync } from 'fs';
import path from 'path';

const userpfpdir = path.dirname(require.main.filename) + '/../img/user/';
const client = new OAuth2Client();
const router = Router();

/* Make sure the profile pic directory exists before listening, no async mkdir, can't await */
mkdirSync(userpfpdir, {recursive: true});

function sendJWT(res, user) {
  const { _id } = user;
  const token = genJWT({ _id , exp: Math.floor((Date.now() + 7*24*60*60*1000)/1000)});

  res.cookie('token', token, {
    maxAge: 7*24*60*60*1000, // 1 week
    httpOnly: true,
    sameSite: 'Lax'
  });
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
  res.json(await user.toJSONFor(user));
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
  res.json(await user.toJSONFor(user));
}));

router.param('user', ah(async (req, res, next, username) => {
  let user = await User.findOne({ username }).exec();

  if (!user) {
    return res.sendStatus(404);
  }

  req.params.user = user;
  next();
}));

router.post('/signout/', ah(async (req, res) => {
  res.cookie('token', '', {maxAge: 1});
  res.end();
}));

router.get('/@:user', ah(async (req, res) => {
  res.json(await req.params.user.toJSONFor());
}));

router.post('/follow/', readUserJwt(false), ah(async (req, res) => {
  const { _id } = req.body;
  req.user.follow(_id);
  res.end();
}));

// pfp
router.post('/mypfp/', readUserJwt(false), ah(async (req, res) => {
  const { pfp } = req.files;
  await fs.writeFile(userpfpdir + req.user._id, pfp.data);
  res.end();
}));

router.get('/pfp/:id', ah(async (req, res) => {
  const { id } = req.params;
  res.sendFile(path.resolve(userpfpdir + id));
}));

export default router;