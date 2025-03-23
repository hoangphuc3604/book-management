const express = require("express");
const app = express();
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

const typeDefs = require("./src/schema/schema");
const resolvers = require("./src/resolver/resolver");
const mongoMethods = require("./src/data/db");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://hoangphuc3604:123@cluster0.ztda0.mongodb.net/LearnGraphQL?retryWrites=true&w=majority&appName=Cluster0"
        );

        console.log("MongoDB connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};
connectDB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoMethods }),
});
server.start().then(() => {
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log(
            `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
        )
    );
});
