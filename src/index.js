const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => "This is API of a Hackernews clone",
    feed: async (parent, args, context) => {
      return await context.prisma.link.findMany();
    },
    link: async (parent, args, context) => {
      return;
    },

  },
  Mutation: {
    post: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return newLink;
    },
    updateLink: (parent, args) => {
      links.forEach((link) => {
        if (link.id == args.id) {
          link.description = args.description;
          link.url = args.url;
        }
      });
      return links.filter((link) => link.id == args.id)[0];
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Running at ${url}`));
