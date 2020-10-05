process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

var describe = mocha.describe;
var it = mocha.it;

chai.should();

chai.use(chaiHttp);



describe('testing register file', () => {
    describe('POST /register success', () => {
        it('should have status 201', (done) => {
            chai.request(server)
                .post("/register")
                .send({ email: 'reg@reg.com', password: 'reg123' })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });

    describe('POST /register missing', () => {
        it('should have status 401', (done) => {
            chai.request(server)
                .post("/register")
                .send({ email: 'reg@reg.com' })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });

    describe('POST /register not unique', () => {
        it('should have status 500', (done) => {
            chai.request(server)
                .post("/register")
                .send({ email: 'reg@reg.com', password: 'reg123' })
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
});
