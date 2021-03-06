require('dotenv').config();
const express = require("express")
const {engine} = require('express-handlebars')
const cookieParser = require('cookie-parser');
const checkAuth = require('./middleware/check-auth');
const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(checkAuth);
app.use(express.static('public'));


require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/replies.js')(app);

require('./data/reddit-db');

app.get('/', (req, res) => {
    res.render('posts-index');
});




app.listen(3000);

module.exports = app;