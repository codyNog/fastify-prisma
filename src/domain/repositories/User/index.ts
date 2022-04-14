import { prismaIncludeQuery } from "~/constants/prisma";
import { User } from "~/domain/entities/User";
import { prisma } from "~/libs/prisma";
import {
  GetUsersQuery,
  userImplConverter,
} from "~/domain/repositories/User/converter";

const { createUserData, updateUserData, getUsersWhere } = userImplConverter;
const include = prismaIncludeQuery.user;

const create = async (user: User): Promise<User> => {
  const data = createUserData(user);
  const newUser: User = await prisma.user.create({ data, include });

  return newUser;
};

const get = async (uid: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { uid },
    include,
  });
  if (!user) throw 404;
  return user;
};

const getMany = async (query: GetUsersQuery): Promise<User[]> => {
  const where = getUsersWhere(query);
  const users: User[] = await prisma.user.findMany({ where, include });
  return users;
};

const update = async (user: User): Promise<User> => {
  const { uid } = user;
  const data = updateUserData(user);
  const newUser: User = await prisma.user.update({
    where: { uid },
    data,
    include,
  });
  return newUser;
};

const deleteUser = async (uid: string): Promise<void> => {
  await prisma.user.delete({ where: { uid } });
};

export const UserImpl = {
  create,
  get,
  getMany,
  update,
  delete: deleteUser,
};

export type UserUseCase = typeof UserImpl;
