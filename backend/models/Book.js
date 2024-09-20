const mongoose = require('mongoose')
const { number } = require('prop-types')

const BookShema = mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    imageUrl: {type: String, required: true},
    year: {type: Number, required: true},
    genre: {type: String, required: true},
});

module.exports = mongoose.model('Book', BookShema);