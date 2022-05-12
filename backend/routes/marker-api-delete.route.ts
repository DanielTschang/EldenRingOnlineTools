import ApiController from "../controllers/marker-api-delete.controller"
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
        this.prefix = "/api/marker"
    }

    protected setMiddleWare(): void {
        this.router.use(Auth.authorize(['deleteMarker']))
    }

    protected setRoutes() {
        this.router.delete('/:id',this.apiController.deleteMarkerById);
    }
}


