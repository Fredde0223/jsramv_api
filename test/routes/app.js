process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

var describe = mocha.describe;
var it = mocha.it;

chai.should();

chai.use(chaiHttp);

describe('testing non existant get', () => {
    describe('GET /notexisting', () => {
        it('should have status 404', (done) => {
            chai.request(server)
                .get("/notexisting")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
});
