const express = require("express")
const {engine} = require('express-handlebars')

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./controllers/posts')(app);

require('./data/reddit-db');

app.get('/', (req, res) => {
    res.render('posts-index');
});




app.listen(3000);

module.exports = app;