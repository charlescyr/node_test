const express = require('express');
const mongoose = require('mongoose');
const app = express();

const path = require('path');

const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/user');

// connexion à MongoDB
mongoose.connect('mongodb+srv://Ennlco:ugytvNwMLG0zJRGW@ennlco.vyiqv.mongodb.net/?retryWrites=true&w=majority&appName=Ennlco',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussi !'))
        .catch(() => console.log('Connexion à MongoDB échoué !'));

// Autoriser toute les requètes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//création de l'application via express
app.use(express.json());

// routes
app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;