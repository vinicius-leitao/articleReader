const express = require('express');
const session = require('express-session');
const app = express();
const routes = require('./routes');
require('dotenv').config();

//Body-parser is now deprecated, use express.urlencoded and express.json instead;
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 30000}
}))

// //View-engine
app.set('view engine', 'ejs');

// //Static
app.use(express.static('public'));

// Rotas

app.use('/', routes);

module.exports = app;