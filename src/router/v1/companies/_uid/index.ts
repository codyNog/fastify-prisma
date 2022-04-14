import { FastifyInstance } from "fastify";
import { routing } from "~/constants/routing";
import { backend } from "~/domain/backend";
import { Company, companySchema } from "~/domain/entities/Company";

const get = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get(
    routing.companies.uid,
    {
      schema: {
        description: "company一件取得",
        tags: ["Company"],
        summary: "company一件取得",
        params: {
          type: "object",
          properties: {
            uid: {
              type: "string",
              description: "companyのuid",
            },
          },
        },
        response: {
          200: companySchema,
        },
      },
    },
    async (request, reply) => {
      type Params = {
        uid: string;
      };
      const { uid } = request.params as Params;
      const company = await backend.company.get(uid);
      reply.send(company);
    }
  );
};

const put = async (fastify: FastifyInstance): Promise<void> => {
  fastify.put(
    routing.companies.uid,
    {
      schema: {
        description: "company編集",
        tags: ["Company"],
        summary: "company編集",
        body: companySchema,
        response: {
          200: companySchema,
        },
      },
    },
    async (request, reply) => {
      type Request = {
        body: Company;
      };
      const { body } = request as Request;
      const company = await backend.company.update(body);
      reply.send(company);
    }
  );
};
const deleteCompany = async (fastify: FastifyInstance): Promise<void> => {
  fastify.delete(
    routing.companies.uid,
    {
      schema: {
        description: "company一件削除",
        tags: ["Company"],
        summary: "company一件削除",
        params: {
          type: "object",
          properties: {
            uid: {
              type: "string",
              description: "companyのuid",
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
      await backend.company.delete(uid);
      reply.send(200);
    }
  );
};

export const companyKeyRouter = async (
  fastify: FastifyInstance
): Promise<void> => {
  get(fastify);
  put(fastify);
  deleteCompany(fastify);
};
