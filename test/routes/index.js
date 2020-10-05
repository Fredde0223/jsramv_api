process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

var describe = mocha.describe;
var it = mocha.it;

chai.should();

chai.use(chaiHttp);

describe('testing index get', () => {
    describe('GET /', () => {
        it('should have status 200', (done) => {
            chai.request(server)
                .get("/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
});
