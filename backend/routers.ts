import Route from "./routes/route";
import AuthRoute from  "./routes/auth.route";
import ApiRoute from  "./routes/marker-api.route";

export const router: Array<Route> = [
    new AuthRoute(),
    new ApiRoute(),
];
