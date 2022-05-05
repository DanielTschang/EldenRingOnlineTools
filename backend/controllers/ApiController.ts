import {Request, Response} from "express";


class ApiController {
  all(req: Request, res: Response) {
    res.send('echo');
  }
  siteofgrace(req: Request, res: Response) {
    res.send('echo');
  }
  shortpath(req: Request, res: Response) {
    res.send('echo');
  }
  waygates(req: Request, res: Response) {
    res.send('echo');
  }
  runefarm(req: Request, res: Response) {
    res.send('echo');
  }
  shop(req: Request, res: Response) {
    res.send('echo');
  }
  npc(req: Request, res: Response) {
    res.send('echo');
  }
  location(req: Request, res: Response) {
    res.send('echo');
  }
  summoningpool(req: Request, res: Response) {
    res.send('echo');
  }
  cave(req: Request, res: Response) {
    res.send('echo');
  }
  horsetorrent(req: Request, res: Response) {
    res.send('echo');
  }
  walkingmausoleum(req: Request, res: Response) {
    res.send('echo');
  }
  bigboss(req: Request, res: Response) {
    res.send('echo');
  }
  boss(req: Request, res: Response) {
    res.send('echo');
  }
  littleboss(req: Request, res: Response) {
    res.send('echo');
  }
  npcinvaders(req: Request, res: Response) {
    res.send('echo');
  }
  
}
export default ApiController;


this.router.get('/all', this.apiController.all);
this.router.get('/siteofgrace', this.apiController.siteofgrace);
this.router.get('/shortpath', this.apiController.shortpath);
this.router.get('/waygates', this.apiController.waygates);
this.router.get('/runefarm', this.apiController.runefarm);
this.router.get('/shop', this.apiController.shop);
this.router.get('/npc', this.apiController.npc);
this.router.get('/location', this.apiController.location);
this.router.get('/summoningpool', this.apiController.summoningpool);
this.router.get('/cave', this.apiController.cave);
this.router.get('/horsetorrent', this.apiController.horsetorrent);
this.router.get('/walkingmausoleum', this.apiController.walkingmausoleum);
this.router.get('/bigboss', this.apiController.bigboss);
this.router.get('/boss', this.apiController.boss);
this.router.get('/boss', this.apiController.boss);
this.router.get('/littleboss', this.apiController.littleboss);
this.router.get('/npcinvaders', this.apiController.npcinvaders);