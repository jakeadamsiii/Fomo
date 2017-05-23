const Artist = require('../models/artist');

function indexRoute(req, res, next) {
  Artist
    .find()
    .populate('createdBy')
    .then((artists) => res.json(artists))
    .catch(next);
}

function createRoute(req, res, next) {
  if(req.file) req.body.image = req.file.filename;
  req.body.createdBy = req.user;
  Artist
    .create(req.body)
    .then((artist) => res.status(201).json(artist))
    .catch(next);
}

function showRoute(req, res, next) {
  Artist
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .then((artist) => {
      if(!artist) return res.notFound();
      res.json(artist);
    })
    .catch(next);
}

function updateRoute(req, res, next) {

  if(req.file) req.body.image = req.file.filename;
  Artist
    .findById(req.params.id)
    .exec()
    .then((artist) => {
      if(!artist) return res.notFound();

      for(const field in req.body) {
        artist[field] = req.body[field];
      }

      return artist.save();
    })
    .then((artist) => res.json(artist))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Artist
    .findById(req.params.id)
    .exec()
    .then((artist) => {
      if(!artist) return res.notFound();
      return artist.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user;

  Artist
    .findById(req.params.id)
    .exec()
    .then((artist) => {
      if(!artist) return res.notFound();

      const comment = artist.comments.create(req.body);
      artist.comments.push(comment); // create an embedded record
      return artist.save()
      .then(()=> res.json(comment));
    })
    .then((artist) => res.redirect(`/artists/${artist.id}`))
    .catch(next);
}

function deleteCommentRoute(req, res, next) {

  Artist
    .findById(req.params.id)
    .exec()
    .then((artist) => {
      if(!artist) return res.notFound();
      // get the embedded record by it's id
      const comment = artist.comments.id(req.params.commentId);
      comment.remove();

      return artist.save();
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
