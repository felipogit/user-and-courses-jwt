import { z } from "zod";
import { userCourseSchema, userCousesArraySchema } from "../schemas";

type UserCourse = z.infer<typeof userCourseSchema>

type UserCourseArray = z.infer<typeof userCousesArraySchema>

export { UserCourse, UserCourseArray }