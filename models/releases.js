const mongoose = require('mongoose');
const s3 = require('../lib/s3');

const releasesSchema = new mongoose.Schema({
  band: {type: String, required: true},
  album: {type: String},
  image: {type: String},
  description: {type: String, required: true}
});

releasesSchema
  .path('image')
  .set(function getPreviousImage(image){
    this._image = this.image;
    return image;
  });

releasesSchema
    .virtual('imageSRC')
    .get(function getImageSRC() {
      if(!this.image) return null;
      return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
    });

releasesSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});


releasesSchema.pre('remove', function deleteImage(next){
  if (this.image) return s3.deleteObject({Key: this.image}, next);
  next();
});

module.exports = mongoose.model('Releases', releasesSchema);
