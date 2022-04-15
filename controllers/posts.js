const Post = require('../models/post');

module.exports = (app) => {

  // home page displaying all posts
    app.get('/', async (req, res) => {
        try {
          const posts = await Post.find({}).lean();
          return res.render('posts-index', { posts });
        } catch (err) {
          console.log(err.message);
        }
      });

  // create new post 

      //new post form
      app.get('/posts/new', (req, res) => {
        res.render('posts-new');
       });

      // saves new post
      app.post('/posts/new', (req, res) => {
        const post = new Post(req.body);
        post.save(() => res.redirect('/'));
      });

  // displays one post
    app.get('/posts/:id', async (req, res) => {
        try {
        const post = await Post.
        findById(req.params.id).lean().populate('comments')
        return res.render('posts-show', { post });
        } catch (err) {
        console.log(err.message);
        }
      });

    app.get('/n/:subreddit', async (req, res) => {
      try {
        const posts = await Post.find({ subreddit: req.params.subreddit }).lean()
        return res.render('posts-index', { posts })
          } catch(err) {
      console.log(err);
    }
    });

    

  };

