// import { OAuth2Client } from "google-auth-library";
import jwt from 'jsonwebtoken';

export function auth(req, res, next) {
  const token = req.body.id_token;
  const secret = process.env.CLIENT_SECRET;
  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res.send({
          error: "Error, you can't pass. Token not verified. Try login again"
        });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.send({ error: 'No token received' });
  }
}

// async function verify() {
//     const ticket = await client.verifyIdToken({
//         idToken: id_token,
//         audience: CLIENT_ID
//         // Specify the CLIENT_ID of the app that accesses the backend
//         // Or, if multiple clients access the backend:
//         //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//     });
//     const payload = ticket.getPayload();
//     const userid = payload["sub"];
//     return userid
//     // If request specified a G Suite domain:
//     // const domain = payload['hd'];
// }
// verify()
//     .then(userid => {
//         req.userid = userid
//         console.log(userid)
//         console.log(req.userid)
//         next();
//     })
//     .catch(console.error);
