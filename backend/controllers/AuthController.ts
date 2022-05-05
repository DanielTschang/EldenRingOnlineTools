import {Request, Response} from "express";


class AuthController {
  echo(req: Request, res: Response) {
    res.send('echo');
  }
}
export default AuthController;