import { AuthLogin } from "../../sql/sql.login";
import { execute } from '../../database/map.database';


export const LoginWithEmail = async(email:string,password:string) => {
    return execute(AuthLogin.LoginWithEmail,[email,password])
}
export const LoginWithUsername = async(username:string,password:string) => {
    return execute(AuthLogin.LoginWithUsername,[username,password])
}


