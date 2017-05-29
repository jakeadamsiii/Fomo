const router = require('express').Router();
const posts = require('../controllers/posts');
const auth = require('../controllers/auth');
const artistController = require('../controllers/artist');
const releasesController = require('../controllers/releases');
const newsController = require('../controllers/news');
const imageUpload = require('../lib/imageUpload');
const secureRoute = require('../lib/secureRoute');

router.route('/posts')
  .get(posts.index)
  .post(secureRoute, imageUpload, posts.create);

router.route('/posts/:id')
  .get(posts.show)
  .delete(secureRoute, posts.delete);

  router.route('/artists')
  .get(artistController.index)
  .post(secureRoute, imageUpload, artistController.create);

router.route('/artists/:id')
  .get(artistController.show)
  .put(imageUpload, artistController.update)
  .delete(secureRoute,artistController.delete);

  router.route('/news')
  .get(newsController.index)
  .post(secureRoute, imageUpload, newsController.create);

router.route('/news/:id')
  .get(newsController.show)
  .put(imageUpload, newsController.update)
  .delete(secureRoute,newsController.delete);

router.route('/releases')
  .get(releasesController.index)
  .post(secureRoute, imageUpload, releasesController.create);

router.route('/releases/:id')
  .get(releasesController.show)
  .put(imageUpload, releasesController.update)
  .delete(secureRoute,releasesController.delete);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
