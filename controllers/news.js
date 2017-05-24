const News = require('../models/news');

function indexRoute(req, res, next) {
  News
    .find()
    .populate('createdBy')
    .then((newss) => res.json(newss))
    .catch(next);
}

function createRoute(req, res, next) {
  if(req.file) req.body.image = req.file.filename;
  req.body.createdBy = req.user;
  News
    .create(req.body)
    .then((news) => res.status(201).json(news))
    .catch(next);
}

function showRoute(req, res, next) {
  News
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .then((news) => {
      if(!news) return res.notFound();
      res.json(news);
    })
    .catch(next);
}

function updateRoute(req, res, next) {

  if(req.file) req.body.image = req.file.filename;
  News
    .findById(req.params.id)
    .exec()
    .then((news) => {
      if(!news) return res.notFound();

      for(const field in req.body) {
        news[field] = req.body[field];
      }

      return news.save();
    })
    .then((news) => res.json(news))
    .catch(next);
}

function deleteRoute(req, res, next) {
  News
    .findById(req.params.id)
    .exec()
    .then((news) => {
      if(!news) return res.notFound();
      return news.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
