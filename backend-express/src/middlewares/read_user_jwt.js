import { checkJWT } from "../utils";
import ah from 'express-async-handler'; /* asyncHandler */

// Verify token
export const readUserJwt = (optional = true) => ah(async (req, res, next) => {
  req.user = null;
  const { token } = req.cookies;
  
  if (!token) {
    if (!optional) {
      throw new Error('Not logged in!');
    }
    
    return;
  }

  const { _id } = checkJWT(token);

  req.user = await User.findOne({_id}).exec();
  next();
});
