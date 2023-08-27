import format from "pg-format"
import { Course, CourseResult, UserCourseArray, UserCreate, UserRead, UserResult, UserReturn } from "../interfaces";
import { client } from "../database";
import { hash } from "bcryptjs";
import { courseReadSchema, userCourseSchema, userCousesArraySchema, userReadSchema, userReturnSchema } from "../schemas";


const create = async (payload: UserCreate): Promise<UserReturn> => {

  payload.password = await hash(payload.password, 10)

  const queryFormat: string = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );

  const query: UserResult = await client.query(queryFormat);
  return userReturnSchema.parse(query.rows[0]);
}

const read = async (): Promise<UserRead> => {
  const query: UserResult = await client.query('SELECT * FROM "users";');
  return userReadSchema.parse(query.rows);
};

const listCourseUser = async (userId: string): Promise<UserCourseArray> => {
  const query: CourseResult = await client.query(
    `
    SELECT
    c."id" AS "courseId",
    c."name" AS "courseName",
    c."description" AS "courseDescription",
    uc."active" AS "userActiveInCourse",
    u."id" AS "userId",
    u."name" AS "userName"
FROM
    "usercourses" uc
JOIN
    "users" u ON uc."userid" = u."id"
JOIN
    "courses" c ON uc."courseid" = c."id";
   
  `
  );
  return userCousesArraySchema.parse(query.rows)
}


const checkIfUserExists = async (userId: string): Promise<boolean> => {
  const query: UserResult = await client.query(
    `SELECT "id" FROM "users" WHERE "id" = $1;`,
    [userId]
  );
  return query.rowCount > 0
}

export default { create, read, listCourseUser, checkIfUserExists }