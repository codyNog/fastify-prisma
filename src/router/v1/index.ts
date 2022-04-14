import { FastifyInstance } from "fastify";
import { companiesRouter } from "~/router/v1/companies";
import { usersRouter } from "~/router/v1/users";

export const v1Router = async (fastify: FastifyInstance): Promise<void> => {
  companiesRouter(fastify);
  usersRouter(fastify);
};
