const router = require('express').Router();
const posts = require('../controllers/posts');
const auth = require('../controllers/auth');
const imageUpload = require('../lib/imageUpload');
const secureRoute = require('../lib/secureRoute');

router.route('/posts')
  .get(posts.index)
  .post(secureRoute, imageUpload, posts.create);

router.route('/posts/:id')
  .get(posts.show)
  .delete(secureRoute, posts.delete);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
