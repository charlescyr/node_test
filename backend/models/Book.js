const mongoose = require('mongoose')

// Schema book
const BookShema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {type: String, required: true},
    author: {type: String, required: true},
    imageUrl: {type: String, required: true},
    year: {type: Number, required: true},
    genre: {type: String, required: true},
    averageRating : {type: Number, default: 0}
});

module.exports = mongoose.model('Book', BookShema);