import { userSchema, userCreateSchema, userUpdateSchema, userReturnSchema, userReadSchema } from "./user.schemas";
import { sessionCreate } from "./session.schema";
import { couseCreateSchema, courseSchema, courseReadSchema } from "./courses.schemas";
import { userCourseSchema, userCousesArraySchema } from "./userCourse.schemas";

export {
    userCreateSchema,
    userSchema,
    userUpdateSchema,
    userReturnSchema,
    sessionCreate,
    userReadSchema,
    courseSchema,
    couseCreateSchema,
    courseReadSchema,
    userCourseSchema, userCousesArraySchema
}