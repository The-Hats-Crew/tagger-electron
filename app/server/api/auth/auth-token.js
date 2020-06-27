import dotenv from 'dotenv';
dotenv.config();
import electronConfig from "../../../electron-builder.config";
import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';

router.post('/', (req, res) => {

  const token = generateToken(req.body);
  req.body = token;
  res.send({ message: 'welcome!', token });
});

function generateToken(token) {
  console.log(electronConfig.REFRESH_TOKEN);
  const payload = {
    provider: 'gmail',
    // token: {
    //   token: token.token.accessToken,
    //   ...token.token
    // }
    token: {
      refresh_token: electronConfig.REFRESH_TOKEN,
    }
  };
  const secret = electronConfig.JWT_SECRET || 'this is a secret';
  const options = {
    expiresIn: '30d'
  };
  return jwt.sign(payload, secret, options);
}

export default router;
