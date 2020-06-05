import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
const router = express.Router();
import jwt from 'jsonwebtoken';

router.post('/', (req, res) => {
  const token = generateToken();
  req.body = token;
  res.send({ message: 'welcome!', token });
})

function generateToken() {
  const payload = {
    provider: 'gmail',
    token: {
      refresh_token: process.env.REFRESH_TOKEN
    }
  };
  const secret = process.env.JWT_SECRET || "this is a secret"
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secret, options);
}

export default router;
