import { generateSchema } from "@anatine/zod-openapi";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { User } from "~/domain/entities/User";

type CreateUserData =
  | (Prisma.Without<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput> &
      Prisma.UserUncheckedCreateInput)
  | (Prisma.Without<Prisma.UserUncheckedCreateInput, Prisma.UserCreateInput> &
      Prisma.UserCreateInput);

const createUserData = (user: User): CreateUserData => {
  const { companyUid, ...rest } = user;
  return { ...rest, company: { connect: { uid: companyUid } } };
};

export const getUsersQuery = z.object({
  companyUid: z.string().optional(),
  name: z.string().optional(),
});

export const getUsersQuerySchema = generateSchema(getUsersQuery);

export type GetUsersQuery = z.infer<typeof getUsersQuery>;

const getUsersWhere = (query: GetUsersQuery): Prisma.UserWhereInput => {
  const where: Prisma.UserWhereInput = query;
  return where;
};

type UpdateUserData =
  | (Prisma.Without<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput> &
      Prisma.UserUncheckedUpdateInput)
  | (Prisma.Without<Prisma.UserUncheckedUpdateInput, Prisma.UserUpdateInput> &
      Prisma.UserUpdateInput);

const updateUserData = (user: User): UpdateUserData => {
  const { companyUid, ...rest } = user;
  return {
    ...rest,
    company: { update: companyUid },
  };
};

export const userImplConverter = {
  createUserData,
  updateUserData,
  getUsersWhere,
};
