import { z } from "zod";

const courseSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(15),
    description: z.string().max(120)
})

const couseCreateSchema = courseSchema.omit({id: true})
const courseReadSchema = courseSchema.array()

export { courseSchema, couseCreateSchema, courseReadSchema }