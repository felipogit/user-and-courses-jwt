import format from "pg-format"
import { Course, CourseCreate, CourseResult } from "../interfaces";
import { client } from "../database";
import { courseReadSchema } from "../schemas";

const create = async (payload: CourseCreate, id: string): Promise<Course> => {
    const queryFormat: string = format(
        'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload),
    )

    const query: CourseResult = await client.query(queryFormat)
    return query.rows[0]

}

const read = async (): Promise<Course[]> => {
    const query: CourseResult = await client.query(
        'SELECT * FROM "courses";'
    );
        return courseReadSchema.parse(query.rows)
};


const enrollCurse = async (userId: string, courseId: string): Promise<void> => {
    await client.query(
        'INSERT INTO "usercourses" ("userid", "courseid") VALUES ($1, $2);',
        [userId, courseId]
    )
    
}

const checkIfCourseExists = async (courseId: string): Promise<boolean> => {
    const query: CourseResult = await client.query(
        'SELECT "id" FROM "courses" WHERE "id" = $1;',
        [courseId]
    )
    return query.rowCount > 0
}

const deleteUserFromCourse = async (userId: string, courseId: string): Promise<void> => {
    await client.query(
      'UPDATE "usercourses" SET "active" = false WHERE "userid" = $1 AND "courseid" = $2;',
      [userId, courseId]
    );
  };
  



export default { create, read, enrollCurse, checkIfCourseExists, deleteUserFromCourse }