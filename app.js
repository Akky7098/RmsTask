const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolver');
const db = require('./db'); // Ensure this correctly sets up your MongoDB connection
const {authMiddleware} = require("./middleware/auth")
const PORT = process.env.PORT || 4000;

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Return the user object set by authMiddleware
      return { user: req.user };
    }
  });
  await server.start();

  const app = express();
  app.use(authMiddleware) 
   server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: PORT }, resolve));
  console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
}

startApolloServer().catch(err => {
  console.error('Error starting server:', err);
});
