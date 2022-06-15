const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const TOKEN = process.env.TOKEN;

const Post = require('../models/post');

exports.createPost = (req, res, next) => {

        const post = new Post({
          title: req.body.title,
          description: req.body.description,
          user: req.body.user,
          userId: req.body.userId,
         // image: req.body.image
        });
        post.save()
          .then(() => res.status(201).json({ message: 'Post envoyé' }))
          .catch(error => res.status(400).json({ error }));
};

exports.findAllPosts = (req, res, next) => {
    Post.find().sort({$natural:-1})
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({title: req.body.title})
              .then(() => res.status(200).json({ message: 'Post '+ req.body.title +'supprimé !'}))
              .catch(error => res.status(400).json({ error }));
  };

exports.PatchPost = (req, res, next) => {
  console.log("Salut!")
};

