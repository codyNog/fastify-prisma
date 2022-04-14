import { generateMock } from "@anatine/zod-mock";
import { Company, company as zodCompany } from "~/domain/entities/Company";
import { User, user as zodUser } from "~/domain/entities/User";

const company: Company = generateMock(zodCompany);
const companies: Company[] = new Array(3).map((_) => generateMock(zodCompany));

const user: User = generateMock(zodUser);
const users: User[] = new Array(3).map((_) => generateMock(zodUser));

export const mock = {
  company: {
    company,
    companies,
  },
  user: {
    user,
    users,
  },
};
