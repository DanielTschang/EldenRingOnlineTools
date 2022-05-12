import TestApiController from "../controllers/marker-test-api.controller"
import Route from "./route";
import * as Auth from "../api/middlewares/auth.middleware";

export default class TestApiRoute extends Route{
    private TestApiController = new TestApiController();

    constructor() {
        super();
        this.setPrefix();
        this.setMiddleWare()
        this.setRoutes();
    }
    protected setPrefix(): void {
        this.prefix = "/test"
    }

    protected setMiddleWare(): void {
        this.router.use(Auth.authorize(['updateMarker']))
    }

    protected setRoutes() {
        this.router.get('/all', this.TestApiController.getAllMarker);
        this.router.get('/:type', this.TestApiController.getMarkerByType);
    }
}


