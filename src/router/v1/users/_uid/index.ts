import { FastifyInstance } from "fastify";
import { routing } from "~/constants/routing";
import { backend } from "~/domain/backend";
import { User, userSchema } from "~/domain/entities/User";

const get = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get(
    routing.users.uid,
    {
      schema: {
        description: "user一件取得",
        tags: ["User"],
        summary: "user一件取得",
        params: {
          type: "object",
          properties: {
            uid: {
              type: "string",
              description: "userのuid",
            },
          },
        },
        response: {
          200: userSchema,
        },
      },
    },
    async (request, reply) => {
      type Params = {
        uid: string;
      };
      const { uid } = request.params as Params;
      const user = await backend.user.get(uid);
      reply.send(user);
    }
  );
};

const put = async (fastify: FastifyInstance): Promise<void> => {
  fastify.put(
    routing.users.uid,
    {
      schema: {
        description: "user編集",
        tags: ["User"],
        summary: "user編集",
        body: userSchema,
        response: {
          200: userSchema,
        },
      },
    },
    async (request, reply) => {
      type Request = {
        body: User;
      };
      const { body } = request as Request;
      const user = await backend.user.update(body);
      reply.send(user);
    }
  );
};

const deleteUser = async (fastify: FastifyInstance): Promise<void> => {
  fastify.delete(
    routing.users.uid,
    {
      schema: {
        description: "user一件削除",
        tags: ["User"],
        summary: "user一件削除",
        params: {
          type: "object",
          properties: {
            uid: {
              type: "string",
              description: "userのuid",
            },
          },
        },
      },
    },
    async (request, reply) => {
      type Params = {
        uid: string;
      };
      const { uid } = request.params as Params;
      await backend.user.delete(uid);
      reply.send(200);
    }
  );
};

export const userUidRouter = async (
  fastify: FastifyInstance
): Promise<void> => {
  get(fastify);
  put(fastify);
  deleteUser(fastify);
};
