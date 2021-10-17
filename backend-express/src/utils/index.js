import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import jwtkey from '../private/jwt-key';

class MultiPromiseError extends Error {
  constructor(errors) {
    super();
    this.errors = errors;
  }
}

export async function allResolved(prom) {
  var errors = [];

  for (var i = 0; i < prom.length; i++) {
    try {
      prom[i] = await prom[i];
    } catch (e) {
      errors.push(e);
    }
  }

  if (errors.length > 0) {
    throw new MultiPromiseError(errors);
  }

  return prom;
}


export function createHash(salt, text) {
  return crypto.createHmac('sha256', salt).update(text).digest('hex');
}

export function genJWT(o) {
  return jwt.sign(o, jwtkey, { algorithm: 'HS256' });
}

export function checkJWT(token) {
  try {
    jwt.verify(token, jwtkey);
  } catch (e) {
    throw new Error("Invalid JWT token");
  }
}

export function uniqueValidator(fieldName) {
  return async function (value) {
    const obj = await this.constructor.findOne({ [fieldName]: value });
    return !obj || obj.id === this.id;
  };
}
