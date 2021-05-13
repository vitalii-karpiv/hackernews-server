const info = () => "This is API of a Hackernews clone";
const feed = async (parent, args, context) => {
  return await context.prisma.link.findMany();
};

module.exports = { info, feed };
