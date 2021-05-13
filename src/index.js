const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const links = [
  {
    id: 1,
    description: "Google",
    url: "google.com",
  },
  {
    id: 2,
    description: "Amazon",
    url: "amazon.com",
  },
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => "This is API of a Hackernews clone",
    feed: () => links,
    link: (parent, args) => {
      return links.filter((link) => link.id == args.id)[0];
    },
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: ++idCount,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
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
});

server.listen().then(({ url }) => console.log(`Running at ${url}`));
