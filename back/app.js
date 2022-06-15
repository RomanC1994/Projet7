const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require("helmet");
const dotenv = require('dotenv').config();

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 100,
	standardHeaders: true, 
	legacyHeaders: false,
})

const postRoutes = require('./routes/post');
const path = require('path');

mongoose.connect('mongodb+srv://'+ process.env.BDD +'@cluster0.wn32e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json());

app.use('/api/', postRoutes);

app.use(helmet());

app.use('/api', apiLimiter);

module.exports = app;