import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';

router.post('/', (req, res) => {

  const token = generateToken(req.body);
  req.body = token;
  res.send({ message: 'welcome!', token });
});

function generateToken(token) {
  const payload = {
    provider: 'gmail',
    // token: {
    //   token: token.token.accessToken,
    //   ...token.token
    // }
    token: {
      refresh_token: process.env.REFRESH_TOKEN || "1//06czs6Jn3Qyd6CgYIARAAGAYSNwF-L9IrjRTB2DOw1eYjXDx8QmvIMhhHElaEa8LwDsTYw4mF90A3HD9Q9pSSaGzyEqxvfsIOyMg",
    }
  };
  const secret = process.env.JWT_SECRET || 'this is a secret';
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secret, options);
}

export default router;
