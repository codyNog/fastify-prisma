import { generateSchema } from "@anatine/zod-openapi";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { Company } from "~/domain/entities/Company";

type CreateCompanyData =
  | (Prisma.Without<
      Prisma.CompanyCreateInput,
      Prisma.CompanyUncheckedCreateInput
    > &
      Prisma.CompanyUncheckedCreateInput)
  | (Prisma.Without<
      Prisma.CompanyUncheckedCreateInput,
      Prisma.CompanyCreateInput
    > &
      Prisma.CompanyCreateInput);

const createData = (company: Company): CreateCompanyData => {
  return {
    name: company.name,
    users: {
      createMany: {
        data: [],
      },
    },
  };
};

const getCompaniesQuery = z.object({
  name: z.string().optional(),
});

export const getCompaniesQuerySchema = generateSchema(getCompaniesQuery);

export type GetCompaniesQuery = z.infer<typeof getCompaniesQuery>;

const getCompaniesWhere = (
  _query: GetCompaniesQuery
): Prisma.CompanyWhereInput => {
  const where: Prisma.CompanyWhereInput = {};
  return where;
};

type UpdateCompanyData =
  | (Prisma.Without<
      Prisma.CompanyUpdateInput,
      Prisma.CompanyUncheckedUpdateInput
    > &
      Prisma.CompanyUncheckedUpdateInput)
  | (Prisma.Without<
      Prisma.CompanyUncheckedUpdateInput,
      Prisma.CompanyUpdateInput
    > &
      Prisma.CompanyUpdateInput);

const updateData = (company: Company): UpdateCompanyData => {
  return company;
};

export const companyImplConveter = {
  createData,
  updateData,
  getCompaniesWhere,
};
