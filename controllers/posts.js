const Post = require('../models/post');
module.exports = (app) => {
    app.get('/', async (req, res) => {
        try {
          const posts = await Post.find({}).lean();
          return res.render('posts-index', { posts });
        } catch (err) {
          console.log(err.message);
        }
      });

    // CREATE
    app.post('/posts/new', (req, res) => {
        const post = new Post(req.body);
        post.save(() => res.redirect('/'));
    });

   
  };