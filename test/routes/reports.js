process.env.NODE_ENV = 'test';

const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app.js');

var describe = mocha.describe;
var it = mocha.it;

chai.should();

chai.use(chaiHttp);

let token = "";

describe('making test user', () => {
    describe('POST /register success', () => {
        it('should have status 201', (done) => {
            chai.request(server)
                .post("/register")
                .send({ email: 'test@test.com', password: 'test123' })
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
                .send({ email: 'test@test.com', password: 'test123' })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    token = res.body.data.token;
                    done();
                });
        });
    });
});

describe('testing report post', () => {
    describe('POST /reports wrong token', () => {
        it('should have status 500', (done) => {
            chai.request(server)
                .post("/reports/")
                .set('x-access-token', 'wrongtoken')
                .send({ title: 'test title', content: 'test content' })
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });

    describe('POST /reports no token', () => {
        it('should have status 401', (done) => {
            chai.request(server)
                .post("/reports/")
                .send({ title: 'test title', content: 'test content' })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });

    describe('POST /reports success', () => {
        it('should have status 201', (done) => {
            chai.request(server)
                .post("/reports/")
                .set('x-access-token', token)
                .send({ title: 'test title unique', content: 'test content' })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });

    describe('POST /reports missing', () => {
        it('should have status 401', (done) => {
            chai.request(server)
                .post("/reports/")
                .set('x-access-token', token)
                .send({ title: 'test title' })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });

    describe('POST /reports unique', () => {
        it('should have status 500', (done) => {
            chai.request(server)
                .post("/reports/")
                .set('x-access-token', token)
                .send({ title: 'test title unique', content: 'test content' })
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
});

describe('testing edit get', () => {
    describe('GET /reports/edit', () => {
        it('should have status 200', (done) => {
            chai.request(server)
                .get("/reports/edit")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
});

describe('testing edit put', () => {
    describe('PUT /reports/edit success', () => {
        it('should have status 201', (done) => {
            chai.request(server)
                .put("/reports/edit")
                .set('x-access-token', token)
                .send({ title: 'test title unique', content: 'test content updated' })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });

    describe('PUT /reports/edit missing', () => {
        it('should have status 401', (done) => {
            chai.request(server)
                .put("/reports/edit")
                .set('x-access-token', token)
                .send({ title: 'test title unique' })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
});

describe('testing get weeks', () => {
    describe('GET /reports/week/1', () => {
        it('should have status 200', (done) => {
            chai.request(server)
                .get("/reports/week/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });

    describe('GET /reports/week/2', () => {
        it('should have status 200', (done) => {
            chai.request(server)
                .get("/reports/week/2")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });

    describe('GET /reports/week/3', () => {
        it('should have status 200', (done) => {
            chai.request(server)
                .get("/reports/week/3")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });

    describe('GET /reports/week/4', () => {
        it('should have status 200', (done) => {
            chai.request(server)
                .get("/reports/week/4")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
});
