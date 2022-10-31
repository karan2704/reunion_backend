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


describe('/api/posts/allposts GET', () => {
    it('returns all posts', (done) => {
        chai.request(server)
            .get('/api/posts/allposts')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.a(Array)
                done();
            });
    });
});


describe('/api/posts POST', () => {
    it('should return Post-ID, Title, Description, Created Time(UTC)', (done) => {
        chai.request(server)
            .post('/api/posts')
            .set('content-type', 'application/json')
            .set('x-access-token', token)
            .send({title: 'Post title', description: 'Post Description'})
            .end((err, res) => {
                res.body.should.have.property('id');
                res.body.should.have.property('title');
                res.body.should.have.property('description');
                res.body.should.have.property('time');
                done();
            });
    });
    it('should return status 500 if any field is missing', (done) => {
        chai.request(server)
            .post('/api/posts')
            .set('content-type', 'application/json')
            .set('x-access-token', token)
            .send({})
            .end((err, res) => {
                res.body.should.have.status(500)
                done();
            });
    });
});

chai.use(chaiHttp);