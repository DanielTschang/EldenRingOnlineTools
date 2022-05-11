import { AuthRegister } from "../../sql/sql.register";
import { execute } from '../../database/map.database';



export const Register = async(email:string,username:string,password:string) => {
    return execute(AuthRegister.Register,[email, username,password])
}


