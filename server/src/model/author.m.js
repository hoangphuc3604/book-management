const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const authorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    books: {
        type: [mongoose.Types.ObjectId],
        ref: "books",
    },
});

module.exports = model("authors", authorSchema);
