
import * as L from "leaflet";
export default {
    "SiteOfGrace":L.icon({
        iconUrl: "https://eldenring.wiki.fextralife.com/file/Elden-Ring/map-d8dc59f2-67df-452e-a9ea-d2c00ddc3a2b/maps-icons/grace.png",
        iconSize:     [35, 35], // size of the icon
    }),
    "shortPath":L.icon({
        iconUrl: 'leaf-green.png',
        shadowUrl: 'leaf-shadow.png',

        iconSize:     [35, 35], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    }),
}