import { z } from "zod";
import { categorySchema } from "./categories.schemas";
import { addressSchema, realEstateSchema } from "./realEstate.schemas";
import { returnUserSchema } from "./users.schemas";

export const createScheduleSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

export const scheduleSchemaWhitUser = createScheduleSchema.extend({
  userId: z.number(),
});
export const scheduleSchema = scheduleSchemaWhitUser.extend({
  id: z.number(),
});

export const schedulesSchemaReturn = scheduleSchema
  .omit({ userId: true, realEstateId: true })
  .array();

export const returnScheduleSchema = z.object({
  userId: returnUserSchema.omit({
    admin: true,
    createdAt: true,
    deletedAt: true,
    email: true,
    name: true,
    updatedAt: true,
  }),
  realEstateId: realEstateSchema.pick({ id: true }),
});
export const returnScheduleByRealEstateSchema = z.object({
  id: z.number(),
  address: addressSchema,
  category: categorySchema,
  user: returnUserSchema,
  realEstate: realEstateSchema,
  date: z.string(),
  hour: z.string(),
});
