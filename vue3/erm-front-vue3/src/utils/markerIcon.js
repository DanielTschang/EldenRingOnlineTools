/* eslint-disable */
import "leaflet";
import "@/plugins/_full"
import iconurl from './IconUrl.json'
import locationMapper from "@/utils/LocationIcons"
import { icon } from "leaflet";

const size = 40
const IconsSize = [size,size]
const IconArchor = [(size / 2), (size / 2)]
const textAnchor = [-18, -10]
const textFont = 'Calibri'

L.icon({
        iconUrl: "https://eldenring.wiki.fextralife.com/file/Elden-Ring/map-d8dc59f2-67df-452e-a9ea-d2c00ddc3a2b/maps-icons/grace.png",
        iconSize: [20, 18],
        iconAnchor: [10, 9],

        text:'test',

    });
export default {
    "SiteOfGrace":(showname)=>{
        return L.icon({
            iconUrl: iconurl.SiteOfGrace,
            iconSize:     IconsSize, // size of the icon
            iconAnchor: IconArchor,
            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "ShortPath":(showname)=>{
        return L.icon({
            iconUrl: iconurl.ShortPath,
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Waygates":(showname)=>{
        return L.icon({
            iconUrl: iconurl.Waygates,
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "RuneFarm":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/runefarmStroke.webp"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Shop":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/shop.webp"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "NPC":(showname)=>{
        return L.icon({
            iconUrl: iconurl.NPC,
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Location":(showname,level)=>{
        if (level!==-1){
            //不知為啥一定要const才吃得到
            const imageName = locationMapper[level].enname + ".webp"
            return L.icon({
                iconUrl: require("@/assets/markerIcon/location/"+ imageName),
                iconSize:     [100,100],
                iconAnchor: -[40,40],

                text: showname,
                textAnchor: textAnchor,         
                textFont:textFont,
                textFillStyle:'#FFFFFF'
            })
        }
        else{
            return L.icon({
                iconUrl: require("@/assets/markerIcon/runefarmStroke.png"),
                iconSize:     IconsSize,
                iconAnchor: IconArchor,

                text: showname,
                textAnchor: textAnchor,         
                textFont:textFont,
                textFillStyle:'#FFFFFF'
            })
        }
    },
    "SummoningPool":(showname)=>{
        return L.icon({
            iconUrl: iconurl.SummoningPool,
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Cave":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/cave.webp"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "HorseTorrent":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/horsetorrentStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "WalkingMausoleum":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/WalkingMausoleum.webp"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "BigBoss":(level)=>{
        const imageName = level + ".webp"
        return L.icon({
            iconUrl: require("@/assets/markerIcon/bigboss/"+imageName),
            iconSize:     [55,55],
            iconAnchor: -[27,27]
        })
    },
    "Boss":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/boss.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "LittleBoss":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/sword.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "NPCInvaders":(showname)=>{
        return L.icon({
            iconUrl: iconurl.NPCInvaders,
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "GreatEnemy":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/dog.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Item":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/other.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Catacombs":(level,showname)=>{
        const imageName = level + ".webp"
        return L.icon({
            iconUrl: require("@/assets/markerIcon/catacombs/"+imageName),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Evergaol":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/evergaol.webp"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "GoldenSeed":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/GoldenSeedStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "CrystalTears":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/crystaltearsStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "KeyItems":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/diamond.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "StoneSwordKey":(level)=>{
        const imageName = level + ".webp"
        return L.icon({
            iconUrl: require("@/assets/markerIcon/stoneswordkey/"+imageName),
            iconSize:     IconsSize,
            iconAnchor: IconArchor
        })
    },
    "DeathRoot":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/DeathRoot.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "DragonHeart":(showname)=>{
        return L.icon({
            iconUrl: iconurl.DragonHeart,
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "LarvalTear":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/larvaltearStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "SacredTear":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/SacredTearStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "SmithingBellBearing":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/bellbearingStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Painting":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/painting.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Gesture":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/Gesture2.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Material":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/tree.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Sorceries":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/sorceryStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Weapon":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/weaponStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Cookbook":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/CookBookStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Whetblade":(level)=>{
        const imageName = level + ".webp"
        return L.icon({
            iconUrl: require("@/assets/markerIcon/whetblade/"+ imageName),
            iconSize:     [45,45],
            iconAnchor: [22.5,22.5]
        })
    },
    "Incantation":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/incantationStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Tailsman":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/talismanStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "AshOfWar":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/ash_of_warStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "SpiritAsh":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/spiritashStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Armor":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/armorStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Warn":(showname)=>{
        return L.icon({
            iconUrl: iconurl.Warn,
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Taoke":(showname)=>{
        return L.icon({
            iconUrl: iconurl.Taoke,
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "SmithingStone":(showname, level)=>{
        const imageName = level + ".webp"

        if (level==9){
            let newsize = 45
            let ImportantIconsSize = [newsize,newsize]
            let ImportantIconArchor = [(newsize / 2), (newsize / 2)]
            return L.icon({
                iconUrl: require("@/assets/markerIcon/smithingstone/"+ imageName),
                iconSize:     ImportantIconsSize,
                iconAnchor: ImportantIconArchor,

                text: showname,
                textAnchor: textAnchor,         
                textFont:textFont,
                textFillStyle:'#FFFFFF'
            })
        }
        // console.log(imageName)
        return L.icon({
            iconUrl: require("@/assets/markerIcon/smithingstone/"+ imageName),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: [-15, -5],         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
        })
    },
    "SomberSmithingStone":(showname,level)=>{
        //不知為啥一定要const才吃得到
        const imageName = level + ".webp"

        if (level==10){
            let newsize = 45
            let ImportantIconsSize = [newsize,newsize]
            let ImportantIconArchor = [(newsize / 2), (newsize / 2)]
            return L.icon({
                iconUrl: require("@/assets/markerIcon/somberstone/"+ imageName),
                iconSize:     ImportantIconsSize,
                iconAnchor: ImportantIconArchor,

                text: showname,
                textAnchor: [-15, -5],         
                textFont:textFont,
                textFillStyle:'#FFFFFF'
            })
        }
        // console.log(imageName)
        return L.icon({
            iconUrl: require("@/assets/markerIcon/somberstone/"+ imageName),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: [-15, -5],         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
        })
    },
    "Question":(showname)=>{
        return L.icon({
            iconUrl: iconurl.Question,
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "MAP":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/MapStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "Text":L.icon({
        iconUrl: iconurl.Text,
        iconSize:     IconsSize,
        iconAnchor: IconArchor
    }),
    "GravePickerBellBearing":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/bellbearingStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "GhostPickerBellBearing":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/bellbearingStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "BellBearing":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/bellbearingStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "SomberBellBearing":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/bellbearingStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},
    "GraveGlovewort":(level)=>{
        const imageName = level + ".webp"
        return L.icon({
            iconUrl: require("@/assets/markerIcon/GraveGlovewort/"+imageName),
            iconSize:     IconsSize,
            iconAnchor: IconArchor
        })
    },
    "GhostGlovewort":(level)=>{
        const imageName = level + ".webp"
        return L.icon({
            iconUrl: require("@/assets/markerIcon/GhostGlovewort/"+imageName),
            iconSize:     IconsSize,
            iconAnchor: IconArchor
        })
    },
    // "Other":()=>{
    //     let canvas = new L.Canvas
    //     cavnas.getContext
    // }
        
    "Other":(showname)=>{
        return L.icon({
            iconUrl: require("@/assets/markerIcon/keyitemsStroke.png"),
            iconSize:     IconsSize,
            iconAnchor: IconArchor,

            text: showname,
            textAnchor: textAnchor,         
            textFont:textFont,
            textFillStyle:'#FFFFFF'
    })},

    

}