import axios from "axios";
import fetch from "node-fetch";
const dsUrl = process.env.DS_PROD_URL || "http://localhost:5000"

export const checkNewMail = (lastIndex = null, credentials) => {
  const postCredentials = {
    provider: credentials.provider,
    recent_id: lastIndex,
    token: {
      ...credentials.token,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    }
  }
  console.log(postCredentials);
  return fetch(dsUrl + "/api/sync", {
    method: "POST",
    body: JSON.stringify({
      provider: credentials.provider,
      recent_id: lastIndex,
      token: {
        ...credentials.token,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
      }
    })
  })
  // return axios.post(dsUrl + "/api/sync", {
  //   provider: credentials.provider,
  //   recent_id: lastIndex,
  //   token: {
  //     ...credentials.token,
  //     client_id: process.env.CLIENT_ID,
  //     client_secret: process.env.CLIENT_SECRET
  //   }
  // })
}
