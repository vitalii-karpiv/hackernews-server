const { ApolloServer } = require("apollo-server");

const typeDefs = `
  type Query {
    info: String!
  }
`;

const resolvers = {
  Query: {
    info: () => "This is API of a Hackernews clone",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Running at ${url}`));
