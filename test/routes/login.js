process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

var describe = mocha.describe;
var it = mocha.it;

chai.should();

chai.use(chaiHttp);

describe('making test user', () => {
    describe('POST /register success', () => {
        it('should have status 201', (done) => {
            chai.request(server)
                .post("/register")
                .send({ email: 'log@log.com', password: 'log123' })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
});

describe('testing login file', () => {
    describe('POST /login success', () => {
        it('should have status 201', (done) => {
            chai.request(server)
                .post("/login")
                .send({ email: 'log@log.com', password: 'log123' })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });

    describe('POST /login missing', () => {
        it('should have status 401', (done) => {
            chai.request(server)
                .post("/login")
                .send({ email: 'log@log.com' })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });

    describe('POST /login wrong user', () => {
        it('should have status 401', (done) => {
            chai.request(server)
                .post("/login")
                .send({ email: 'wrong@log.com', password: 'log123' })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });

    describe('POST /login wrong password', () => {
        it('should have status 401', (done) => {
            chai.request(server)
                .post("/login")
                .send({ email: 'log@log.com', password: 'wrongpassword' })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
});
