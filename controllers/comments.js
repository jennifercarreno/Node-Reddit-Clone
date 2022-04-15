const Post = require('../models/post');

const Comment = require('../models/comment');

module.exports = (app) => {

    app.get('/sign-up', (req, res) => {
        res.render('sign-up');
       });

    // CREATE Comment
    app.post('/posts/:postId/comments', (req, res) => {
        // INSTANTIATE INSTANCE OF MODEL
        const comment = new Comment(req.body);
      
        // SAVE INSTANCE OF Comment MODEL TO DB
        comment
          .save()
          .then(() => Post.findById(req.params.postId))
          .then((post) => {
            post.comments.unshift(comment);
            return post.save();
          })
          .then(() => res.redirect('/'))
          .catch((err) => {
            console.log(err);
          });
      });
};