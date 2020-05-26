// Tests by Labs24: Cody Denniston and Matt Bergeron

const request = require('supertest')
const auth = require('./message-router')
const {google} = require('googleapis');


describe('message router middleware', () => {

    describe('GET @/email/:id', () => {
        it.todo('')
    })

    describe('GET @/email/thread/:id', () => {
        it.todo('')
    })

    describe('GET @/email/thread-message/:id', () => {
        it.todo('')
    })

    describe('GET @/label/:label/page', () => {
        it.todo('')
        
    })

    describe('POST @/analytics', () => {
        it.todo('')
    })

    descsribe('POST @/search/dev/:page', () => {
        it.todo('')
    })

    descsribe('POST @/search/column/:page', () => {
        it.todo('')
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