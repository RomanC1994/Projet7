const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const postSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true},
  user: { type: String, required: true},
  userId: { type: String, required: true},
  //image: { data: Buffer, contentType: String},
});

postSchema.plugin(uniqueValidator);

delete mongoose.models.Post;
module.exports = mongoose.model('Post', postSchema);