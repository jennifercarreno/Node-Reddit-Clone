
// import express from 'express';
// import { engine } from 'express-handlebars';
// import require from 'express-validator'

const express = require('express')
const app = express()


require('./controllers/posts')(app);
require('./data/reddit-db');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/posts/new', (req, res, next) => {
    res.render('posts-new');
});

app.listen(3000);