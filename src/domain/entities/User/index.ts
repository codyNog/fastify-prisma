import { generateSchema } from "@anatine/zod-openapi";
import { z, ZodLiteral } from "zod";

export const userRoles = ["ADMIN", "GUEST"] as const;

const userRole = userRoles.map((elem) => z.literal(elem)) as [
  ZodLiteral<"ADMIN">,
  ZodLiteral<"GUEST">
];

const role = z.union(userRole);

export type UserRole = z.infer<typeof role>;

export const user = z.object({
  uid: z.string(),
  name: z.string(),
  email: z.string(),
  role,
  companyUid: z.string(),
});

export type User = z.infer<typeof user>;

export const userSchema = generateSchema(user);
export const usersSchema = generateSchema(z.array(user));
