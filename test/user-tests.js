const mongoose = require("mongoose");
const User = require('../models/userSchema');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server.js');
let should = chai.should();

var token;

before(() => {
    testUser = new User({
        username: 'John Doe',
        password: 'pass123',
        email: 'johndoe@example.com',
      });
      testUser.save(() => {});
})

after((done) => {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
    done();
});

describe('/api/:user GET', () => {
    it('returns user info when a valid id is passed', (done) => {
        chai.request(server)
            .get('/api/635e36b8bd4e4f2e5fa11d2a')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('username')
                res.body.should.have.property('followers')
                res.body.should.have.property('following')
                done();
            });
    });

    it('returns user 404 when an invalid id is passed', (done) => {
        chai.request(server)
            .get('/api/635e36b8bd4e4f2e5fa11d2a')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});


chai.use(chaiHttp);