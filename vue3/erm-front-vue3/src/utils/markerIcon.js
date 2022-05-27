
import * as L from "leaflet";
import iconurl from './IconUrl.json'
// eslint-disable-next-line
import locationMapper from "@/utils/LocationIcons"

const size = 30
const IconsSize = [size,size]
const IconArchor = [(size / 2), (size / 2)]
export default {
    "SiteOfGrace":L.icon({
        iconUrl: iconurl.SiteOfGrace,
        iconSize:     IconsSize, // size of the icon
        iconAnchor: IconArchor
    }),
    "ShortPath":L.icon({
        iconUrl: iconurl.ShortPath,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Waygates":L.icon({
        iconUrl: iconurl.Waygates,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "RuneFarm":L.icon({
        iconUrl: require("@/assets/markerIcon/runefarmStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Shop":L.icon({
        iconUrl: iconurl.Shop,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "NPC":L.icon({
        iconUrl: iconurl.NPC,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Location":(level)=>{
        if (level!==-1){
            //不知為啥一定要const才吃得到
            const imageName = locationMapper[level].enname + ".webp"
            return L.icon({
                iconUrl: require("@/assets/markerIcon/location/"+ imageName),
                iconSize:     [80,80],
                iconAnchor: -[40,40]
            })
        }
        else{
            return L.icon({
                iconUrl: require("@/assets/markerIcon/runefarmStroke.png"),
                iconSize:     IconsSize,
                iconAnchor: IconArchor
            })
        }
    }
    
    ,
    "SummoningPool":L.icon({
        iconUrl: iconurl.SummoningPool,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Cave":L.icon({
        iconUrl: iconurl.Cave,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "HorseTorrent":L.icon({
        iconUrl: require("@/assets/markerIcon/horsetorrentStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "WalkingMausoleum":L.icon({
        iconUrl: iconurl.WalkingMausoleum,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "BigBoss":L.icon({
        iconUrl: iconurl.BigBoss,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Boss":L.icon({
        iconUrl: iconurl.Boss,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "LittleBoss":L.icon({
        iconUrl: iconurl.LittleBoss,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "NPCInvaders":L.icon({
        iconUrl: iconurl.NPCInvaders,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "GreatEnemy":L.icon({
        iconUrl: iconurl.GreatEnemy,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Item":L.icon({
        iconUrl: require("@/assets/markerIcon/other.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Cartacombs":L.icon({
        iconUrl: iconurl.Cartacombs,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Evergaol":L.icon({
        iconUrl: iconurl.Evergaol,
        iconSize:     [50,50],
        iconAnchor: IconArchor
    }),
    "GoldenSeed":L.icon({
        iconUrl: require("@/assets/markerIcon/GoldenSeedStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "CrystalTears":L.icon({
        iconUrl: require("@/assets/markerIcon/crystaltearsStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "KeyItems":L.icon({
        iconUrl: require("@/assets/markerIcon/keyitemsStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "StoneSwordKey":L.icon({
        iconUrl: require("@/assets/markerIcon/stoneswordkeyStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "DeathRoot":L.icon({
        iconUrl: require("@/assets/markerIcon/DeathRoot.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "DragonHeart":L.icon({
        iconUrl: iconurl.DragonHeart,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "LarvalTear":L.icon({
        iconUrl: require("@/assets/markerIcon/larvaltearStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),

    "SacredTear":L.icon({
        iconUrl: require("@/assets/markerIcon/SacredTearStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "SmithingBellBearing":L.icon({
        iconUrl: require("@/assets/markerIcon/bellbearingStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Painting":L.icon({
        iconUrl: require("@/assets/markerIcon/painting.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Gesture":L.icon({
        iconUrl: require("@/assets/markerIcon/Gesture2.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Material":L.icon({
        iconUrl: iconurl.Material,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Sorceries":L.icon({
        iconUrl: require("@/assets/markerIcon/sorceryStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Weapon":L.icon({
        iconUrl: require("@/assets/markerIcon/weaponStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Cookbook":L.icon({
        iconUrl: require("@/assets/markerIcon/CookBookStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Whetblade":L.icon({
        iconUrl: require("@/assets/markerIcon/whetstoneStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Incantation":L.icon({
        iconUrl: require("@/assets/markerIcon/incantationStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Tailsman":L.icon({
        iconUrl: require("@/assets/markerIcon/talismanStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "AshOfWar":L.icon({
        iconUrl: require("@/assets/markerIcon/ash_of_warStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "SpiritAsh":L.icon({
        iconUrl: require("@/assets/markerIcon/spiritashStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Armor":L.icon({
        iconUrl: require("@/assets/markerIcon/armorStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Warn":L.icon({
        iconUrl: iconurl.Warn,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Taoke":L.icon({
        iconUrl: iconurl.Taoke,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "SmithingStone":L.icon({
        iconUrl: require("@/assets/markerIcon/smithing_stone_5Stroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "SomberSmithingStone":L.icon({
        iconUrl: require("@/assets/markerIcon/somber_smithing_stone_5Stroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Question":L.icon({
        iconUrl: iconurl.Question,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "MAP":L.icon({
        iconUrl: require("@/assets/markerIcon/MapStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Text":L.icon({
        iconUrl: iconurl.Text,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "GravePickerBellBearing":L.icon({
        iconUrl: require("@/assets/markerIcon/bellbearingStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "GhostPickerBellBearing":L.icon({
        iconUrl: require("@/assets/markerIcon/bellbearingStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "BellBearing":L.icon({
        iconUrl: require("@/assets/markerIcon/bellbearingStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "SomberBellBearing":L.icon({
        iconUrl: require("@/assets/markerIcon/bellbearingStroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "GraveGlovewort":L.icon({
        iconUrl: require("@/assets/markerIcon/grave_glovewort_5Stroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "GhostGlovewort":L.icon({
        iconUrl: require("@/assets/markerIcon/ghost_glovewort_5Stroke.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "Other":L.icon({
        iconUrl: require("@/assets/markerIcon/other.png"),
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),

    

}