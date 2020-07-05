import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import electronConfig from '../../../electron-builder.config';
dotenv.config();
const router = express.Router();

router.post('/', (req, res) => {

  const token = generateToken(req.body);
  res.send({ message: 'welcome!', token });
});

function generateToken(token) {
  console.log(electronConfig.REFRESH_TOKEN);
  const payload = {
    provider: 'gmail',
    token: {
      token: token.access_token,
      ...token
    }
    // token: {
    //   refresh_token: electronConfig.REFRESH_TOKEN,
    // }
  };
  const secret = electronConfig.JWT_SECRET || 'this is a secret';
  const options = {
    expiresIn: '1h'
  };
  return jwt.sign(payload, secret, options);
}

export default router;
