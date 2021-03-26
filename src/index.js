const express = require('express');
const connection = require('./database/database');
const Article  = require('./models/Article');
const Category = require('./models/Category');

const app = require('./config');


//Database
// connection
//     .authenticate()
//     .then(() => {
//         console.log('Connection established');
//     })
//     .catch(e => {
//         console.log(e);
//     })



app.get('/', (req, res) => {
    res.render('index');
})

app.listen(3000, (req, res) => {
    console.log('Server is running!');
})