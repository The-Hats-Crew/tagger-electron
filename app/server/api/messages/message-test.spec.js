// Tests by Labs24: Cody Denniston and Matt Bergeron
/**
 * The initial tests will only test the functions of the message-router to see if the
 * router functions work as is, not the message-model helper functions.
 */

const request = require('supertest')
const auth = require('./message-router')
const {google} = require('googleapis');


describe('message router middleware', () => {

    describe('GET @/email/:id', () => {
        it.todo('should set the id to the requested paramater id')
        it.todo('should send a JSON object')
        it.todo('should send error if the id is not correct')
    })

    describe('GET @/email/thread/:id', () => {
        it.todo('should set the id to the requested paramater id')
        it.todo('should send a JSON object')
        it.todo('should send error if the id is not correct')
    })

    describe('GET @/email/thread-message/:id', () => {
        it.todo('should set the id to the requested paramater id')
        it.todo('should send a JSON object')
        it.todo('should send error if the id is not correct')
    })

    describe('GET @/label/:label/page', () => {
        it.todo('should check to make sure the page number is not less than 0')
        it.todo('should check to make sure the page is not equal to 0')
        it.todo('should send a JSON object')
    })

    describe('POST @/analytics', () => {
        it.todo('should set the address to the requested body address')
        it.todo('should send a JSON object')
        it.todo('the JSON object should have name set to the address name')
    })

    describe('POST @/search/dev/:page', () => {
        it.todo('should check to make sure the page number is not less than 0')
        it.todo('should check to make sure the page is not equal to 0')
        it.todo('should send a JSON object')
    })

    describe('POST @/search/column/:page', () => {
        it.todo('should check to make sure the page number is not less than 0')
        it.todo('should check to make sure the page is not equal to 0')
        it.todo('should send a JSON object')
    })

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

})
