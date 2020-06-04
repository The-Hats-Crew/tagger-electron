require('dotenv').config();
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/token', (req, res) => {
  const token = generateToken();
  req.body = token
    .then(token => {
      res.send({ message: 'welcome!', token });
    })
    .catch(error => {
      res.send({ error: error });
    });
});

function generateToken() {
  const payload = {
    provider: 'gmail',
    token: {
      refresh_token: process.env.REFRESH_TOKEN,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    }
  };
  const secret = process.env.JWT_SECRET || "this is a secret"
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
