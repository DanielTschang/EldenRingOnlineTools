import {Request, Response} from "express";


class DefaultController {
  echo(req: Request, res: Response) {
    res.send('echo');
  }
}
export default DefaultController;