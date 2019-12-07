// dependency variables
const express = require('express');
const session = require('express-session')
const knexSessionStore = require('connect-session-knex')(session)
const configureMiddleware = require('./configure-middleware.js');

// login cookie

const sessionOptions = {
    name: 'loginCookie',
    secret: 'ajMakingThatBigAssMoneyDawg',
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore({
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60
    })
}

const apiRouter = require('./api-router.js');

const server = express();

configureMiddleware(server);

server.use(session(sessionOptions))


server.use('/api', apiRouter);

module.exports = server;