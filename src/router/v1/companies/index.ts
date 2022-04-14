import { FastifyInstance } from "fastify";
import { routing } from "~/constants/routing";
import { backend } from "~/domain/backend";
import {
  companiesSchema,
  Company,
  companySchema,
} from "~/domain/entities/Company";
import {
  GetCompaniesQuery,
  getCompaniesQuerySchema,
} from "~/domain/repositories/Company/converter";
import { companyKeyRouter } from "~/router/v1/companies/_uid";

const post = async (fastify: FastifyInstance): Promise<void> => {
  fastify.post(
    routing.companies.root,
    {
      schema: {
        description: "company新規作成",
        tags: ["Company"],
        summary: "company新規作成",
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
      const company = await backend.company.create(body);
      reply.send(company);
    }
  );
};

const get = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get(
    routing.companies.root,
    {
      schema: {
        description: "company一覧取得",
        tags: ["Company"],
        summary: "company一覧取得",
        querystring: getCompaniesQuerySchema,
        response: {
          200: companiesSchema,
        },
      },
    },
    async (request, reply) => {
      type Request = {
        query: GetCompaniesQuery;
      };
      const { query } = request as Request;
      const companies = await backend.company.getMany(query);
      reply.send(companies);
    }
  );
};

const rootRouter = async (fastify: FastifyInstance): Promise<void> => {
  post(fastify);
  get(fastify);
};

export const companiesRouter = async (
  fastify: FastifyInstance
): Promise<void> => {
  rootRouter(fastify);
  companyKeyRouter(fastify);
};
