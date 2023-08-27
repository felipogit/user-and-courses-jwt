import { z } from "zod";

const userCourseSchema = z.object({
    courseId: z.number().positive(),
    courseName: z.string(),
    courseDescription: z.string(),
    userActiveInCourse: z.boolean(),
    userId: z.number(),
    userName: z.string()
})

const userCousesArraySchema = userCourseSchema.array()

export {
    userCourseSchema,
    userCousesArraySchema
}