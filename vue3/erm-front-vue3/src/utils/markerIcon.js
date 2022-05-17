
import * as L from "leaflet";
import iconurl from './IconUrl.json'
export default {
    "SiteOfGrace":L.icon({
        iconUrl: iconurl.SiteOfGrace,
        iconSize:     [35, 35], // size of the icon
    }),
    "shortPath":L.icon({
        iconUrl: iconurl.shortPath,
        iconSize:     [35, 35],
    }),
    "Waygates":L.icon({
        iconUrl: iconurl.Waygates,
        iconSize:     [35, 35],
    }),
    "RuneFarm":L.icon({
        iconUrl: iconurl.RuneFarm,
        iconSize:     [35, 35],
    }),
    "Shop":L.icon({
        iconUrl: iconurl.Shop,
        iconSize:     [35, 35],
    }),
    "NPC":L.icon({
        iconUrl: iconurl.NPCIcon,
        iconSize:     [35, 35],
    }),
    "Location":L.icon({
        iconUrl: iconurl.Location,
        iconSize:     [35, 35],
    }),
}