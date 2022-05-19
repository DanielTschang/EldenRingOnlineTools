
import * as L from "leaflet";
import iconurl from './IconUrl.json'
export default {
    "SiteOfGrace":L.icon({
        iconUrl: iconurl.SiteOfGrace,
        iconSize:     [25, 25], // size of the icon
    }),
    "shortPath":L.icon({
        iconUrl: iconurl.shortPath,
        iconSize:     [25, 25],
    }),
    "Waygates":L.icon({
        iconUrl: iconurl.Waygates,
        iconSize:     [25, 25],
    }),
    "RuneFarm":L.icon({
        iconUrl: iconurl.RuneFarm,
        iconSize:     [25, 25],
    }),
    "Shop":L.icon({
        iconUrl: iconurl.Shop,
        iconSize:     [25, 25],
    }),
    "NPC":L.icon({
        iconUrl: iconurl.NPCIcon,
        iconSize:     [25, 25],
    }),
    "Location":L.icon({
        iconUrl: iconurl.Location,
        iconSize:     [25, 25],
    }),
}