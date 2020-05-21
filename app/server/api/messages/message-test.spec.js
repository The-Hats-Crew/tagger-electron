// Tests by Labs24: Cody Denniston and Matt Bergeron

const request = require('supertest')
const auth = require('./message-router')
const {google} = require('googleapis');


describe('message router middleware', () => {

    describe('GET @/email/:id', () => {
        todo('should retrieve email with set id')
        todo('should order email by descending order by the date')
        todo('it should send an email object')
    })

    describe('GET @/email/thread/:id', () => {
        todo('Should retrieve a thread of emails by the thread id')
        todo('Should retrieve emails in descending order by date')
    })

    describe('POST /analytics', () => {
        todo('Should retrieve an email from the address that sent it')
        todo('Should retrieve a name from the email object')
        todo('The recievied count should increment by 1 for each email recieved')
    })

})