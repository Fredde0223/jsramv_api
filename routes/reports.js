const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');

const router = express.Router();

const db = new sqlite3.Database('./db/textsReports.sqlite');

const jwtSecret = process.env.JWT_SECRET;

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, jwtSecret, function(err, decoded) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: req.path,
                        title: "Failed authentication",
                        detail: err.message
                    }
                });
            }

            next();

            return undefined;
        });
    } else {
        return res.status(401).json({
            errors: {
                status: 401,
                source: req.path,
                title: "No token",
                detail: "No token provided in request headers"
            }
        });
    }
}

function addReport(res, body) {
    const title = body.title;
    const content = body.content;

    if (!title || !content) {
        return res.status(401).json({
            errors: {
                status: 401,
                source: "/reports",
                title: "Title or content missing",
                detail: "Title or content missing in request"
            }
        });
    }

    db.run("INSERT INTO reports (title, content) VALUES (?, ?)",
        title,
        content, (err) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/reports",
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            return res.status(201).json({
                data: {
                    message: "Content successfully added."
                }
            });
        });
}

router.post("/",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => addReport(res, req.body));

function getReports(res, req) {
    db.all("SELECT * FROM reports",
    (err, rows) => {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/reports/edit",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
        res.json( { data: rows } );
    });
}

router.get("/edit", (req, res) => getReports(res, req.body));

function editReports(res, body) {
    const selected = body.selected;
    const title = body.title;
    const content = body.content;

    if (!title || !content) {
        return res.status(401).json({
            errors: {
                status: 401,
                source: "/reports/edit",
                title: "Title or content missing",
                detail: "Title or content missing in request"
            }
        });
    }

    db.run("UPDATE reports SET title = ?, content = ? WHERE title = ?",
        title,
        content,
        selected, (err) => {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/reports/edit",
                        title: "Database error",
                        detail: err.message
                    }
                });
            }

            return res.status(201).json({
                data: {
                    message: "Content successfully updated."
                }
            });
        });
}

router.put("/edit",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => editReports(res, req.body));

function getOne(res, req) {
    db.all("SELECT * FROM reports",
    (err, rows) => {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/reports/edit",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
        res.json( { data: rows[0] } );
    });
}

router.get("/week/1", (req, res) => getOne(res, req.body));

function getTwo(res, req) {
    db.all("SELECT * FROM reports",
    (err, rows) => {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/reports/edit",
                    title: "Database error",
                    detail: err.message
                }
            });
        }
        res.json( { data: rows[1] } );
    });
}

router.get("/week/2", (req, res) => getTwo(res, req.body));

module.exports = router;
