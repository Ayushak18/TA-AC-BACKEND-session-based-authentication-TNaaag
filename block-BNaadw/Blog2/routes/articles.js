let express = require('express');
let router = express.Router();
let Article = require('../models/articles');
let Comment = require('../models/comments');

router.get('/', (req, res) => {
  Article.find({}, (error, articles) => {
    if (error) {
      next(error);
    } else {
      res.render('articles', { articles: articles });
    }
  });
});

router.get('/new', (req, res, next) => {
  res.render('newArticle');
});

router.post('/new', (req, res, next) => {
  Article.create(req.body, (error, article) => {
    if (error) {
      next(error);
    } else {
      res.redirect('/articles');
    }
  });
});

// router.get('/:id', (req, res, next) => {
//   let id = req.params.id;
//   Article.findById(id, (error, article) => {
//     if (error) {
//       next(error);
//     } else {
//       res.render('singleArticle', { article: article });
//     }
//   });
// });

router.get('/:id', (req, res) => {
  let id = req.params.id;
  Article.findById(id)
    .populate('comments')
    .exec((error, data) => {
      if (error) {
        next(error);
      } else {
        res.render('singleArticle', { article: data });
      }
    });
});

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (error, article) => {
    if (error) {
      next(error);
    } else {
      res.render('articleEdit', { article: article });
    }
  });
});

router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, (error, article) => {
    if (error) {
      next(error);
    } else {
      res.redirect('/articles/' + article.id);
    }
  });
});

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndRemove(id, (error, article) => {
    if (error) {
      next(error);
    } else {
      res.redirect('/articles');
    }
  });
});

router.post('/:id/comment', (req, res, next) => {
  let id = req.params.id;
  req.body.articleId = id;
  Comment.create(req.body, (error, comment) => {
    if (error) {
      next(error);
    } else {
      Article.findByIdAndUpdate(
        id,
        { $push: { comments: comment.id } },
        (error, data) => {
          if (error) {
            next(error);
          } else {
            res.redirect('/articles/' + id);
          }
        }
      );
    }
  });
});

module.exports = router;
