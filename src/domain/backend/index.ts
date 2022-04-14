import { CompanyImpl } from "~/domain/repositories/Company";
import { UserImpl } from "~/domain/repositories/User";

export const backend = {
  user: UserImpl,
  company: CompanyImpl,
};

export type Backend = typeof backend;
