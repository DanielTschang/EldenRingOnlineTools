import ApiController from "../controllers/marker-api-get.controller"
import Route from "./route";
import * as Auth from "../api/middlewares/auth.middleware";

export default class ApiRoute extends Route{
    private apiController = new ApiController();

    constructor() {
        super();
        this.setPrefix();
        this.setMiddleWare()
        this.setRoutes();
    }
    protected setPrefix(): void {
        this.prefix = "/api"
    }

    protected setMiddleWare(): void {
        this.router.use(Auth.authorize(['getMarker']))
    }

    protected setRoutes() {
        this.router.get('/all', this.apiController.getAllMarker); 
        this.router.get('/:type', this.apiController.getMarkerByType);
        this.router.get('/id/:id', this.apiController.getMarkerById);
    }
}
