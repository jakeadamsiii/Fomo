const Releases = require('../models/releases');

function indexRoute(req, res, next) {
  Releases
    .find()
    .populate('createdBy')
    .then((releasess) => res.json(releasess))
    .catch(next);
}

function createRoute(req, res, next) {
  if(req.file) req.body.image = req.file.filename;
  req.body.createdBy = req.user;
  Releases
    .create(req.body)
    .then((releases) => res.status(201).json(releases))
    .catch(next);
}

function showRoute(req, res, next) {
  Releases
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .then((releases) => {
      if(!releases) return res.notFound();
      res.json(releases);
    })
    .catch(next);
}

function updateRoute(req, res, next) {

  if(req.file) req.body.image = req.file.filename;
  Releases
    .findById(req.params.id)
    .exec()
    .then((releases) => {
      if(!releases) return res.notFound();

      for(const field in req.body) {
        releases[field] = req.body[field];
      }

      return releases.save();
    })
    .then((releases) => res.json(releases))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Releases
    .findById(req.params.id)
    .exec()
    .then((releases) => {
      if(!releases) return res.notFound();
      return releases.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Releases
    .findById(req.params.id)
    .exec()
    .then((releases) => {
      if(!releases) return res.notFound();

      const comment = releases.comments.create(req.body);
      releases.comments.push(comment); // create an embedded record
      return releases.save()
      .then(()=> res.json(comment));
    })
    .then((releases) => res.redirect(`/releasess/${releases.id}`))
    .catch(next);
}

function deleteCommentRoute(req, res, next) {

  Releases
    .findById(req.params.id)
    .exec()
    .then((releases) => {
      if(!releases) return res.notFound();
      // get the embedded record by it's id
      const comment = releases.comments.id(req.params.commentId);
      comment.remove();

      return releases.save();
    })
    .then(() => res.status(204).end())
    .catch(next);
}



module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
