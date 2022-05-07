import Route from "./routes/route";
import AuthRoute from  "./routes/auth.route";
import GetMarkerRoute from  "./routes/marker-api-get.route";
import AddMarkerRoute from "./routes/marker-api-add.route";
import UpdateMarkerRoute from "./routes/marker-api-update.route";
import DeleteMarkerRoute from "./routes/marker-api-delete.route";

export const router: Array<Route> = [
    new AuthRoute(),
    new GetMarkerRoute(),
    new AddMarkerRoute(),
    new UpdateMarkerRoute(),
    new DeleteMarkerRoute(),
];
