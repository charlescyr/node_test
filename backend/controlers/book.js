const Book = require('../models/Book');

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
};

// supprimer un éléments
exports.deleteBook = (req, res, next) => {
    Book.deleteOne({ _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};

// lire les information de lélément séléctionner
exports.selectBook = (req, res, next) =>{
    Book.findOne({ _id: req.params.id})
        .then(books => res.status(200).json(books))
        .catch(error => res.status(404).json({ error }));
};

// lire tout les éléments
exports.readBook = (req, res, next) =>{
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};