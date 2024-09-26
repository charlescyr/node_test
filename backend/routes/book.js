const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const bookCtrl = require('../controlers/book');

// route pour ajouter un élément
router.post('/', auth, multer, bookCtrl.createBook);
 
// route pour modifier un élément
router.put('/:id', auth, multer, bookCtrl.updateBook);
 
router.delete('/:id', auth, bookCtrl.deleteBook);
 
// route pour lire un élément séléctionné
router.get('/:id', auth, bookCtrl.selectBook);
 
// route pour lire les éléments présent
router.get('/', auth, bookCtrl.readBook);

module.exports = router;