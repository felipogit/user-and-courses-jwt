import handleErrors from "./handleErrors";
import validateBody from "./validateBody.middleware";
import { uniqueEmail } from "./uniqueEmail.middleware";
import verifyToken from "./verifyToken.middleware";
import verifyUserPermission from "./verifyUserPermission.Middleware";

export default { handleErrors, validateBody, uniqueEmail, verifyToken, verifyUserPermission}