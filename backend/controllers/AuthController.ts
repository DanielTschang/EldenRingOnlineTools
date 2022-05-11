import {Request, Response} from "express";
import { IUser, IUserGetReq, IUserLoginEmailReq, IUserLoginUserNameReq, IUserRegisterReq }  from "../api/models/user.model";
import { validateLogin } from '../api/utils/auth.utils';
import * as AuthLogin from './utils/auth.login'
import * as AuthRegister from './utils/auth.register'
import bcrypt from 'bcrypt'
import { generateToken } from '../api/utils/jwt.utils';


class AuthController {
  async login(req: IUserLoginUserNameReq | IUserLoginEmailReq, res: Response){
    try{
      const {error}:any = validateLogin(req.body);
      if (error){
        res.status(400).send({ message : error.details[0].message});
      }

      const email = req.body.email;
      const username = req.body.username;
      const password = req.body.password;

      const user = await AuthLogin.LoginWithEmail(email,password)
      if(user.length === 0){
        return res.status(401).send({message : "Invalid Email or Password", status:401})
      }

      const validPassword = await bcrypt.compare(
        password, user.password
      )
      if(!validPassword){
        return res.status(401).send({message:"Invalid Email or Password",status:401})
      }

      const payload = {
        name: user.username,
        userId: user.id,
        accessTypes: [
            'getMarker',
            'updateMarker',
            'addMarker',
            'deleteMarker'
        ]
      }
      
      const token = generateToken(payload)
      res.status(200).send({data:token, message:"Logged in successfully"})

    }catch(error){
      console.error('[AuthController][login][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
      res.status(500).send({message:"Internal Server Error"})
    }
  }
  async register(req: IUserRegisterReq , res: Response){

    try{
      const {error}:any = validateLogin(req.body);
      if (error){
        res.status(400).send({ message : error.details[0].message, status:400});
      }
      const email = req.body.email;
      const username = req.body.username;
      const password = req.body.password;

      //try find if exist
      const user = await AuthLogin.LoginWithEmail(email,password)
      if(user.length!==0){
        return res.status(409).send({message : "Email already registered", status:409})
      }

      const salt = await bcrypt.genSalt(Number(process.env.SALT))
      const hashPassword = await bcrypt.hash(password, salt);
      
      await AuthRegister.Register(email,username,password);
      res.status(201).send({message:"User Created Successfully",status:201});
    } catch(error){
      res.status(500).send({message:"Internal Server Error", status:500});
    }
    
  }
  getuser(req: IUserGetReq, res: Response){
    res.send('s')
  }

}
export default AuthController;