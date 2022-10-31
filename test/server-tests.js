const mongoose = require("mongoose");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();



describe('/ GET', () => {
    it('returns user info when a valid id is passed', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.property('message').that.equals("Hello User");
                done();
            });
    });
});


chai.use(chaiHttp);