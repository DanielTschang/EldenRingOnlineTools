import ApiController from "../controllers/ApiController"
import Route from "./route";

class ApiRoute extends Route{
    private apiController = new ApiController();

    constructor() {
        super();
        this.setRoutes();
    }

    protected setRoutes() {
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
    }
}

export default ApiRoute;