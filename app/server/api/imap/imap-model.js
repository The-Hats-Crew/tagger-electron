const imapService = require("./imap-service");

export async function getLatestMail(imapUser, imapPassword, imapServer) {
  return imapService.getLatestMail(imapUser, imapPassword, imapServer);
}
