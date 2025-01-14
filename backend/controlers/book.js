const Book = require('../models/Book');
const fs = require('fs');

// ajouter un élément
exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    book.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

// modifier un élément
exports.updateBook = (req, res, next) =>{
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body };
    
    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId){
                res.status(401).json({ message : 'Non-autorisé' });
            } else {
                Book.updateOne({ _id: req.params.id}, {...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message: 'objet modifié !'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
};

// supprimer un éléments
exports.deleteBook = (req, res, next) => {
    Book.findOne({_id: req.params.id})
    .then(book =>{
        if(book.userId != req.auth.userId){
            res.status(401).json({message: 'NON-Authorizé !'})
        } else {
            const filename = book.imageUrl.split('/images/')[1];
            fs.unlink(`image/${filename}`, () =>{
                Book.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: 'Objet supprimé !'}))
                .catch(error => res.status(401).json({error}));
            });
        };
    })
    .catch(error => res.status(500).json({error}));
};

// lire les information de lélément séléctionner
exports.selectBook = (req, res, next) =>{
    Book.findOne({ _id: req.params.id})
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
};

// lire tout les éléments
exports.readBook = (req, res, next) =>{
    Book.find()
        .then(book => res.status(200).json(book))
        .catch(error => res.status(400).json({ error }));
};