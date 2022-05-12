import AuthController from "../controllers/AuthController"
import Route from "./route";

class AuthRoute extends Route{
    private authController = new AuthController();

    constructor() {
        super();
        this.setPrefix();
        this.setMiddleWare()
        this.setRoutes();
    }

    protected setPrefix(): void {
        this.prefix = "/auth"
    }

    protected setMiddleWare() {
        // this.router.use()
    }
    protected setRoutes() {
        this.router.post('/login', this.authController.login);
        this.router.post('/register', this.authController.register)
    }
}

export default AuthRoute;