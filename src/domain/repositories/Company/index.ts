import { prismaIncludeQuery } from "~/constants/prisma";
import { Company } from "~/domain/entities/Company";
import { prisma } from "~/libs/prisma";
import {
  companyImplConveter,
  GetCompaniesQuery,
} from "~/domain/repositories/Company/converter";

const { createData, updateData, getCompaniesWhere } = companyImplConveter;
const include = prismaIncludeQuery.company;

const create = async (company: Company): Promise<Company> => {
  const data = createData(company);
  const newCompany = await prisma.company.create({ data, include });

  return newCompany;
};

const getMany = async (query: GetCompaniesQuery): Promise<Company[]> => {
  const where = getCompaniesWhere(query);
  const companies = await prisma.company.findMany({ where, include });
  return companies;
};

const get = async (uid: string): Promise<Company> => {
  const company = await prisma.company.findUnique({
    where: { uid },
    include,
  });
  if (!company) throw 404;
  return company;
};

const update = async (company: Company): Promise<Company> => {
  const { uid } = company;
  const data = updateData(company);
  const newCompany: Company = await prisma.company.update({
    where: { uid },
    data,
    include,
  });

  return newCompany;
};

const deleteCompany = async (uid: string): Promise<void> => {
  await prisma.company.delete({ where: { uid } });
};

export const CompanyImpl = {
  create,
  getMany,
  get,
  update,
  delete: deleteCompany,
};
