import { z } from "zod"
import { userCreateSchema, userReadSchema, userReturnSchema, userSchema, userUpdateSchema } from "../schemas"
import { QueryResult } from "pg";


type User = z.infer<typeof userSchema>

type UserCreate = z.infer<typeof userCreateSchema>;
type UserUpdate = z.infer<typeof userUpdateSchema>
type UserRead = z.infer<typeof userReadSchema>
type UserResult = QueryResult<User>
type UserReturn = z.infer<typeof userReturnSchema>

export { UserCreate, User, UserRead, UserResult, UserUpdate, UserReturn }