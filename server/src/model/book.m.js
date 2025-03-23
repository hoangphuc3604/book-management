const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose.Types.ObjectId,
        ref: "authors",
        require: true,
    },
});

module.exports = model("books", bookSchema);
