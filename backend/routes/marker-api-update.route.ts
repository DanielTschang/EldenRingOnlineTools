import ApiController from "../controllers/marker-api-update.controller"
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
        this.router.use(Auth.authorize(['updateMarker']))
    }

    protected setRoutes() {
        this.router.patch('/:id', this.apiController.updateMarkerById);
    }
}


