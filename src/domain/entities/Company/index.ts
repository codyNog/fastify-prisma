import { generateSchema } from "@anatine/zod-openapi";
import { z } from "zod";
import { user } from "~/domain/entities/User";

export const company = z.object({
  uid: z.string(),
  name: z.string(),
  users: z.array(user),
});

export type Company = z.infer<typeof company>;

export const companySchema = generateSchema(company);
export const companiesSchema = generateSchema(z.array(company));
