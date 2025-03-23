const bookModel = require("../model/book.m");
const authorModel = require("../model/author.m");

const mongoMethods = {
    getAllBooks: async (condition = null) =>
        await bookModel.find(condition).lean(),
    getAllAuthors: async () => await authorModel.find().lean(),
    getBookById: async (id) => await bookModel.findById(id).lean(),
    getAuthorById: async (id) => await authorModel.findById(id).lean(),
    createAuthor: async (args) => await authorModel.create(args),
    createBook: async (args) => {
        const book = await bookModel.create(args);
        await authorModel.updateOne(
            { _id: args.authorId },
            { $addToSet: { books: book._id } }
        );
        return book;
    },
};

module.exports = mongoMethods;
