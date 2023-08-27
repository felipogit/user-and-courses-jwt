import { z } from "zod";

const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50).min(1),
    email: z.string().email().max(50).min(10),
    password: z.string().max(120),
    admin: z.boolean().default(false)
})

const userCreateSchema = userSchema.omit({ id: true });
const userReturnSchema = userSchema.omit({ password: true })
const userReadSchema = userReturnSchema.array()
const userUpdateSchema = userCreateSchema.partial();


export {
    userCreateSchema,
    userSchema,
    userUpdateSchema,
    userReturnSchema,
    userReadSchema
}