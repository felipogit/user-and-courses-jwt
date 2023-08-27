import { z } from "zod";
import { courseReadSchema, courseSchema, couseCreateSchema } from "../schemas";
import { QueryResult } from "pg";

type Course = z.infer<typeof courseSchema>
type CourseCreate = z.infer<typeof couseCreateSchema>
type CourseRead = z.infer<typeof courseReadSchema>

type CourseResult = QueryResult<Course>

export { Course, CourseCreate, CourseResult, CourseRead }