// Tests by Labs24: Cody Denniston and Matt Bergeron
/**
 * The initial tests will only test the functions of the message-router to see if the
 * router functions work as is, not the message-model helper functions.
 */

const request = require('supertest');
const auth = require('./message-router');
const { google } = require('googleapis');

describe('message router middleware', () => {

  const example_user = {
    id: 1,
    email: 'taggerlabs20@gmail.com',
    // host: 'imap.gmail.com',
    // token: "dXNlcj10YWdnZXJsYWJzMjBAZ21haWwuY29tAWF1dGg9QmVhcmVyIHlhMjkuSWwtOEJ5TVcwRVdSOEwtLXJfcU1OS2VLSERmYWJ4SU1OUHZQRXg5YW9ySnhEWEdnNkMwbHd2eVBVQlNFYkROeUhZYmNFbkZvZGlWblhJeWlHVzROd3U0eXZlVS1YX0dJcEpfMWQwOFdnVmpqWTZ2Y2ZfRU15V1VXR0JqbTV2RjgtZwEB"
  }

  const example_email = {
    id: 1,
    message_id: "test message_id" ,
    from: 'message tesing',
    name: 'matt bergeron',
    to: 'tagger labs',
    subject: "test email subjet",
    email_body: 'test email body',
    email_body_text: 'test email body text',
    date: 'test date',
    uid: 1,
    labels: 'test label',
    gMsgId: 'test gMsgId',
    gmThreadID: 'test gmThreadID',
    user_id: 1
  }

  const example_tag = {
    id: 1,
    tag: "test tag",
    email_id: 1
  }

  beforeEach(async () => {
    await db('emails')
      .truncate()
      .then(() => db('users').truncate())
      .then(() => db('emails').truncate())
      .then(() => db('tags').truncate());
      return db('users')
        .insert(example_user)
        .then(() => db())
  })

  describe('GET @/email/:id', () => {
    it.todo('should set the id to the requested paramater id', () => {
      
    });
    it.todo('should send a JSON object');
    it.todo('should send error if the id is not correct');
  });

  describe('GET @/email/thread/:id', () => {
    it.todo('should set the id to the requested paramater id');
    it.todo('should send a JSON object');
    it.todo('should send error if the id is not correct');
  });

  describe('GET @/email/thread-message/:id', () => {
    it.todo('should set the id to the requested paramater id');
    it.todo('should send a JSON object');
    it.todo('should send error if the id is not correct');
  });

  describe('GET @/label/:label/page', () => {
    it.todo('should check to make sure the page number is not less than 0');
    it.todo('should check to make sure the page is not equal to 0');
    it.todo('should send a JSON object');
  });

  describe('POST @/analytics', () => {
    it.todo('should set the address to the requested body address');
    it.todo('should send a JSON object');
    it.todo('the JSON object should have name set to the address name');
  });

  describe('POST @/search/dev/:page', () => {
    it.todo('should check to make sure the page number is not less than 0');
    it.todo('should check to make sure the page is not equal to 0');
    it.todo('should send a JSON object');
  });

  describe('POST @/search/column/:page', () => {
    it.todo('should check to make sure the page number is not less than 0');
    it.todo('should check to make sure the page is not equal to 0');
    it.todo('should send a JSON object');
  });

  // these will be for when we get the server up and running
  // describe('GET @/', () => {
  //     it.todo('')
  // })

  // describe('POST @/stream', () => {
  //     it.todo('')
  // })

  // describe('POST @/train', () => {
  //     it.todo('')
  // })

  // describe('POST @/predict', () => {
  //     it.todo('')
  // })

  // describe('POST @/boxes', () => {
  //     it.todo('')
  // })
});
