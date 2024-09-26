const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();

const bookCtrl = require('../controlers/book')

// route pour ajouter un élément
router.post('/', auth, bookCtrl.createBook);
 
// route pour modifier un élément
router.put('/:id', auth, bookCtrl.updateBook);
 
router.delete('/:id', auth, bookCtrl.deleteBook);
 
// route pour lire un élément séléctionné
router.get('/:id', auth, bookCtrl.selectBook);
 
// route pour lire les éléments présent
router.get('/', auth, bookCtrl.readBook);

module.exports = router;