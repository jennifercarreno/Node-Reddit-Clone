const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = (app) => {

  // home page displaying all posts
    app.get('/', async (req, res) => {
        try {
          const posts = await Post.find({}).lean().populate('author')
          const currentUser = req.user;
          const { user } = req;


          return res.render('posts-index', { posts, user, currentUser });
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
        if (req.user) {
          const userId = req.user._id;
          const post = new Post(req.body);
          post.author = userId;

          post
        .save()
        .then(() => User.findById(userId))
        .then((user) => {
          user.posts.unshift(post);
          user.save();
          // REDIRECT TO THE NEW POST
          return res.redirect(`/posts/${post._id}`);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
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

