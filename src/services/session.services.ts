import { sign } from "jsonwebtoken";
import { client } from "../database";
import { AppError } from "../errors";
import { SessionCreate, SessionReturn, User, UserResult } from "../interfaces";
import { compare } from "bcryptjs";

const create = async (paylodad: SessionCreate): Promise<SessionReturn> => {
   const query: UserResult = await client.query(
    'SELECT * FROM "users" WHERE "email" = $1', [paylodad.email]
   )

   if(query.rowCount === 0){
    throw new AppError("Wrong email/password", 401)
   }
   
   const user: User = query.rows[0]
   const samePassword: boolean = await compare(paylodad.password, user.password)

   if(!samePassword){
    throw new AppError("Wrong email/password", 401)   
}

const token: string = sign(
    { name: user.name, admin: user.admin },
    process.env.SECRET_KEY!,
    { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN!}
   )
return  { token } 

}

export default { create }