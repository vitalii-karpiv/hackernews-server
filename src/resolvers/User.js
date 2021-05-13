module.exports = links = (parent, args, context) => {
  console.log(parent);
  return context.prisma.user.findUnique({ where: { id: parent.id } }).links();
};
