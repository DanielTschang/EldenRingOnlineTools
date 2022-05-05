import {Router} from "express";

abstract class Route {
    protected router = Router();
    protected abstract setRoutes(): void;
    protected abstract setMiddleWare(): void;

    public getRouter() {
        return this.router;
    }
}

export default Route;