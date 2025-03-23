const bookModel = require("../model/book.m");
const authorModel = require("../model/author.m");

const resolvers = {
    Query: {
        books: async (parent, args, { mongoMethods }) =>
            await mongoMethods.getAllBooks(),
        authors: async (parent, args, { mongoMethods }) =>
            await mongoMethods.getAllAuthors(),
        book: async (parent, args, { mongoMethods }) =>
            await mongoMethods.getBookById(args.id),
        author: async (parent, args, { mongoMethods }) =>
            await mongoMethods.getAuthorById(args.id),
    },
    Book: {
        author: async (parent, args, { mongoMethods }) =>
            await mongoMethods.getAuthorById(parent.authorId),
    },
    Author: {
        books: async (parent, args, { mongoMethods }) => {
            return await mongoMethods.getAllBooks({
                _id: { $in: parent.books },
            });
        },
    },

    // Mutation
    Mutation: {
        createAuthor: async (parent, args) => {
            return await authorModel.create(args);
        },
        createBook: async (parent, args) => {
            const book = await bookModel.create(args);
            await authorModel.updateOne(
                { _id: args.authorId },
                { $addToSet: { books: book._id } }
            );
            return book;
        },
    },
};

module.exports = resolvers;
