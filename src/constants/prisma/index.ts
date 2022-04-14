const user = {};
const company = {
  users: { include: user },
};

export const prismaIncludeQuery = {
  company,
  user,
};
