let express = require('express');
let router = express.Router();
let Article = require('../models/articles');
let Comment = require('../models/comments');

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Comment.findById(id, (error, comment) => {
    if (error) {
      next(error);
    } else {
      res.render('commentEdit', { comment: comment });
    }
  });
});

router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, (error, comment) => {
    if (error) {
      next(error);
    } else {
      res.redirect('/articles/' + comment.articleId);
    }
  });
});

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndRemove(id, (error, comment) => {
    if (error) {
      next(error);
    } else {
      Article.findByIdAndUpdate(
        comment.articleId,
        { $pull: { comments: id } },
        (error, article) => {
          if (error) {
            next(error);
          } else {
            res.redirect('/articles/' + comment.articleId);
          }
        }
      );
    }
  });
});

// router.get('/:id/delete', (req, res, next) => {
//   let id = req.params.id;
//   Comment.findByIdAndRemove(id, (error, comment) => {
//     if (error) {
//       next(error);
//     } else {
//       Article.findByIdAndUpdate(
//         comment.articeId,
//         { $pull: { comments: id } },
//         (error, article) => {
//           if (error) {
//             next(error);
//           } else {
//             res.redirect('/articles/' + comment.articleId);
//           }
//         }
//       );
//     }
//   });
// });

module.exports = router;
