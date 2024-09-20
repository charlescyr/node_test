const express = require('express');
const mongoose = require('mongoose');

const Book = require('./models/Book');

const app = express();

mongoose.connect('mongodb+srv://Ennlco:ugytvNwMLG0zJRGW@ennlco.vyiqv.mongodb.net/?retryWrites=true&w=majority&appName=Ennlco',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussi !'))
        .catch(() => console.log('Connexion à MongoDB échoué !'))

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

module.exports = app;