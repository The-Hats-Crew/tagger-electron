// Tests by Labs24: Cody Denniston and Matt Bergeron

const request = require('supertest')
const auth = require('./message-router')
const {google} = require('googleapis');


describe('message router middleware', () => {

    describe('GET @/email/:id', () => {
        it.todo('should retrieve email with set id')
        it.todo('should order email by descending order by the date')
        it.todo('it should send an email object')
    })

    describe('GET @/email/thread/:id', () => {
        it.todo('Should retrieve a thread of emails by the thread id')
        it.todo('Should retrieve emails in descending order by date')
    })

    describe('GET @/email/thread-message/:id', () => {
        it.todo('should return a database of emails')
        it.todo('should return the database based on specific message id')
    })

    describe('GET @/label/:label/page', () => {
        it.todo('should check to make sure the page number is not less than 0')
        it.todo('should check to make sure the page is not equal to 0')
        it.todo('should call the database emails')
        it.todo('should get the email based on user id and label inputs')
        it.todo('should reutrn the count of the messages')
        
    })

    describe('POST @/analytics', () => {
        it.todo('Should retrieve an email from the address that sent it')
        it.todo('Should retrieve a name from the email object')
        it.todo('The recievied count should increment by 1 for each email recieved')
    })

    descsribe('POST @/search/dev/:page', () => {
        it.todo('should check to make sure the page number is not less than 0')
        it.todo('should check to make sure the page is not equal to 0')
        it.todo('should return a database based on the query of a keyword')
    })

    descsribe('POST @/search/column/:page', () => {
        it.todo('should check to make sure the page number is not less than 0')
        it.todo('should check to make sure the page is not equal to 0')
        it.todo('should return a database of emails based on query keyword')
        it.todo('should return a count of the query results')
    })

    // this is a long one save for last
    describe('GET @/', () => {
        it.todo('should set the lastMessageId to the requested query')
        it.todo('should pass the user credentials ')
    })

    describe('POST @/stream', () => {
        it.todo('')
    })

    describe('POST @/train', () => {
        it.todo('')
    })

    describe('POST @/predict', () => {
        it.todo('')
    })

    describe('POST @/boxes', () => {
        it.todo('')
    })

})