import DefaultController from "../controllers/Default.Controller";
import Route from "./route";

class DefaultRoute extends Route{
    private authController = new DefaultController();

    constructor() {
        super();
        this.setPrefix();
        this.setMiddleWare()
        this.setRoutes();
    }

    protected setPrefix(): void {
        this.prefix = "/"
    }

    protected setMiddleWare() {
        // this.router.use()
    }
    protected setRoutes() {
        this.router.get('/', this.authController.echo);
    }
}

export default DefaultRoute;