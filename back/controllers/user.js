const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const dotenv = require('dotenv').config();
const TOKEN = process.env.TOKEN;

const User = require('../models/user');
const saltRounds = 10;
var schemaPassword = new passwordValidator();
schemaPassword
.is().min(8)                                  
.is().max(100)                            
.has().uppercase()                      
.has().lowercase()               
.has().digits(2)                               
.has().not().spaces()      

exports.signup = (req, res, next) => {
  if (schemaPassword.validate(req.body.password) == true) {
    bcrypt.genSalt(saltRounds)
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  }
  else {
    console.log("This is not a good password or a good Email");
  }
   
  };

  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                  { userId: user._id },
                  TOKEN,
                  { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };