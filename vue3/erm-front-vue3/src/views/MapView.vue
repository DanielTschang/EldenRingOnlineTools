

<template>
    <div id="map-container" >
        <map-side-bar @changeTypes="changeTypes" :initfilterType="filterType"/>
        
        <div id="mymap">
        </div>
    </div>
</template>


<script>
import * as L from "leaflet";
import { getCookie, setCookie } from '@/utils/Cookies';
import prefix from '@/utils/control-prefix'
import getMarkerByType from "@/utils/getMarker"
import MarkerIcon from "@/utils/markerIcon"
import MapSideBar from "@/components/sidebar/MapSideBar.vue"
import "@/css/leaflet.css"
import "@/css/customstyle.css"

// eslint-disable-next-line
import axios from 'axios';

export default {
    name: 'MapView',
    components:{
        MapSideBar
    },
    methods:{
        changeTypes(checkedType){
            let deletedType = this.filterType.filter(type => !checkedType.includes(type));
            let addType = checkedType.filter(type=>!this.filterType.includes(type))
            console.log('add', addType);
            console.log('delete', deletedType)
            this.filterType = checkedType
            if(addType.length>0){
                addType.forEach(type => {
                    this.MarkerTypes[type].addTo(this.MainMap)
                })
            }
            if(deletedType.length>0){
                deletedType.forEach(type => {
                    this.MainMap.removeLayer(this.MarkerTypes[type])
                })
            }
            setCookie("filterType", this.filterType)
        }
    },
    data(){
        return {
            MainMap:null,
            groundLayer:true,
            zoom:4,
            markers:[],
            maxZoom:7,
            minZoom:2,
            tileSize:200,
            zoomOffset:0,
            initCenterLat:40,
            initCenterLng:-40,
            mapWidth:100,
            mapHeight:100,
            maxBounds:L.latLngBounds(L.latLng(-100, -200), L.latLng(100, 100)),
            groundMapUrl:'https://imgs.ali213.net/picfile/eldenring/{z}/{x}/{y}.jpg',
            undergroundMapUrl:'',
            //https://imgs.ali213.net/picfile/eldenring_dx/{z}/{x}/{y}.png
            filterType: [],
            MarkerTypes: {
                "SiteOfGrace" : L.layerGroup(),
                "ShortPath" : L.layerGroup(),
                "Waygates" : L.layerGroup(),
                "RuneFarm" : L.layerGroup(),
                "Shop" : L.layerGroup(),
                "NPC" : L.layerGroup(),
                "Location" : L.layerGroup(),
                "SummoningPool" : L.layerGroup(),
                "Cave" : L.layerGroup(),
                "HorseTorrent" : L.layerGroup(),
                "WalkingMausoleum" : L.layerGroup(),
                "BigBoss" : L.layerGroup(),
                "Boss" : L.layerGroup(),
                "LittleBoss" : L.layerGroup(),
                "NPCInvaders" : L.layerGroup(),
                "GreatEnemy" : L.layerGroup(),
                "Item" : L.layerGroup(),
                "Cartacombs" : L.layerGroup(),
                "Evergaol" : L.layerGroup(),
                "GoldenSeed" : L.layerGroup(),
                "CrystalTears" : L.layerGroup(),
                "KeyItems" : L.layerGroup(),
                "StoneSwordKey" : L.layerGroup(),
                "DeathRoot" : L.layerGroup(),
                "DragonHeart" : L.layerGroup(),
                "LarvalTear" : L.layerGroup(),
                "PickersBellBearing" : L.layerGroup(),
                "SacredTear" : L.layerGroup(),
                "MinersBellBearing" : L.layerGroup(),
                "Painting" : L.layerGroup(),
                "Gesture" : L.layerGroup(),
                "Material" : L.layerGroup(),
                "Sorceries" : L.layerGroup(),
                "Weapon" : L.layerGroup(),
                "Cookbook" : L.layerGroup(),
                "Whetblade" : L.layerGroup(),
                "Other" : L.layerGroup(),
                "Incantation" : L.layerGroup(),
                "Tailsman" : L.layerGroup(),
                "AshOfWar" : L.layerGroup(),
                "SpiritAsh" : L.layerGroup(),
                "Armor" : L.layerGroup(),
                "SomberSmithingStone" : L.layerGroup(),
                "MAP" : L.layerGroup(),
                "Text" : L.layerGroup(),
                "Warn" : L.layerGroup(),
                "SmithingStone" : L.layerGroup(),
                "Taoke" : L.layerGroup(),
                "Question" : L.layerGroup(),
                "BellBearing" : L.layerGroup(),
                "SmithingBellBearing" : L.layerGroup(),
                "SomberBellBearing" : L.layerGroup(),
                "GraveGlovewort" : L.layerGroup(),
                "GravePickerBellBearing" : L.layerGroup(),
                "GhostGlovewort" : L.layerGroup(),
                "GhostPickerBellBearing" : L.layerGroup(),
            },
            
        }
    },
    async created(){
        let zoomCookie = getCookie('zoom');
        let latCookie = getCookie('centerlat');
        let lngCookie = getCookie('centerlng');
        let TypeCookie = getCookie('filterType');
        console.log(TypeCookie)
        console.log(zoomCookie)
        

        this.zoom = zoomCookie == "" ? this.zoom : zoomCookie ;
        this.initCenterLat = latCookie == "" ? this.initCenterLat : latCookie;
        this.initCenterLng = lngCookie == "" ? this.initCenterLng : lngCookie;
        this.filterType = TypeCookie == "" ? ["Location"] : TypeCookie.split(",")
        
    },
    async mounted(){
        /*
            Map Init Section [Start]
        */
        //地底地圖 Underground map layer
        let underground = L.tileLayer(this.undergroundMapUrl, {
            attribution: '',
            maxZoom: this.maxZoom,
            id: 'underground',
            tileSize: this.tileSize,
            zoomOffset: this.zoomOffset
        })
        //地上地圖 Ground map layer
        let ground = L.tileLayer(this.groundMapUrl, {
            attribution: 'Elden Ring Map',
            maxZoom: this.maxZoom,
            id: 'ground',
            tileSize: this.tileSize,
            zoomOffset: this.zoomOffset,
            
        })

        //init Map
        this.MainMap = L.map("mymap", {
            maxZoom:this.maxZoom,
            minZoom:this.minZoom,
            attributionControl: false, 
            zoomControl: false, 
            maxBounds: this.maxBounds,
            renderer: L.canvas(),
            preferCanvas: true,
            layers: [ground,underground]
        }).setView([this.initCenterLat,this.initCenterLng],this.zoom);

        /**
         * for testing
         */

        this.MainMap.on('click', (e)=>{
            console.log(e.latlng);
        })

        /*
            Map Init Section [End]
        */

        /*
            Map Listeners Section [Start]
        */

        //zoom end
        this.MainMap.on('zoomend', () => {
            setCookie('zoom', this.MainMap.getZoom());
        })
        //move end
        this.MainMap.on('moveend',()=>{
            setCookie('centerlat', this.MainMap.getCenter().lat);
            setCookie('centerlng', this.MainMap.getCenter().lng);
        })
        /*
            Map Listeners Section [End]
        */


        /*
            Map marker Section [Start]
        */

        this.markers = await getMarkerByType("all")
        this.markers.forEach(marker=>{
            let customPopup = marker.type + " : " + marker.name + "<input type='checkbox' id={title} value='title' v-model='checkedNames'> <label for='title'>{{title}}</label>";
            let customOptions =
                {
                    'maxWidth': '400',
                    'width': '200',
                    'className' : 'popupCustom'
                }
            
            switch (marker.type) {
                case "SiteOfGrace":
                    this.MarkerTypes["SiteOfGrace"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['SiteOfGrace']}).bindPopup(customPopup,customOptions));
                    break;
                case "shortPath":
                    this.MarkerTypes["ShortPath"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['ShortPath']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Waygates":
                    this.MarkerTypes["Waygates"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Waygates']}).bindPopup(marker.type +" "+marker.name))
                    break    
                case "RuneFarm":
                    this.MarkerTypes["RuneFarm"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['RuneFarm']}).bindPopup(marker.type +" "+marker.name))
                    break  
                case "Shop":
                    this.MarkerTypes["Shop"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Shop']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "NPC":
                    this.MarkerTypes["NPC"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['NPC']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Location":
                    // eslint-disable-next-line
                    let level = marker.level             
                    this.MarkerTypes["Location"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Location'](level)}).bindPopup(marker.type +" "+marker.name))
                    break
                case "SummoningPool":
                    this.MarkerTypes["SummoningPool"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['SummoningPool']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Cave":
                    this.MarkerTypes["Cave"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Cave']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "HorseTorrent":
                    this.MarkerTypes["HorseTorrent"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['HorseTorrent']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "WalkingMausoleum":
                    this.MarkerTypes["WalkingMausoleum"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['WalkingMausoleum']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "BigBoss":
                    this.MarkerTypes["BigBoss"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['BigBoss']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Boss":
                    this.MarkerTypes["Boss"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Boss']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "LittleBoss":
                    this.MarkerTypes["LittleBoss"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['LittleBoss']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "NPCInvaders":
                    this.MarkerTypes["NPCInvaders"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['NPCInvaders']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "GreatEnemy":
                    this.MarkerTypes["GreatEnemy"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['GreatEnemy']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Item":
                    this.MarkerTypes["Item"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Item']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Cartacombs":
                    this.MarkerTypes["Cartacombs"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Cartacombs']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Evergaol":
                    this.MarkerTypes["Evergaol"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Evergaol']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "GoldenSeed":
                    this.MarkerTypes["GoldenSeed"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['GoldenSeed']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "CrystalTears":
                    this.MarkerTypes["CrystalTears"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['CrystalTears']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "KeyItems":
                    this.MarkerTypes["KeyItems"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['KeyItems']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "StoneSwordKey":
                    this.MarkerTypes["StoneSwordKey"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['StoneSwordKey']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "DeathRoot":
                    this.MarkerTypes["DeathRoot"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['DeathRoot']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "DragonHeart":
                    this.MarkerTypes["DragonHeart"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['DragonHeart']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "LarvalTear":
                    this.MarkerTypes["LarvalTear"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['LarvalTear']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "SacredTear":
                    this.MarkerTypes["SacredTear"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['SacredTear']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Painting":
                    this.MarkerTypes["Painting"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Painting']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Gesture":
                    this.MarkerTypes["Gesture"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Gesture']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Material":
                    this.MarkerTypes["Material"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Material']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Sorceries":
                    this.MarkerTypes["Sorceries"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Sorceries']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Weapon":
                    this.MarkerTypes["Weapon"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Weapon']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Cookbook":
                    this.MarkerTypes["Cookbook"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Cookbook']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Whetblade":
                    this.MarkerTypes["Whetblade"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Whetblade']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Incantation":
                    this.MarkerTypes["Incantation"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Incantation']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Tailsman":
                    this.MarkerTypes["Tailsman"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Tailsman']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "AshOfWar":
                    this.MarkerTypes["AshOfWar"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['AshOfWar']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "SpiritAsh":
                    this.MarkerTypes["SpiritAsh"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['SpiritAsh']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Armor":
                    this.MarkerTypes["Armor"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Armor']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Warn":
                    this.MarkerTypes["Warn"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Warn']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Taoke":
                    this.MarkerTypes["Taoke"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Taoke']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "SmithingStone":
                    this.MarkerTypes["SmithingStone"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['SmithingStone']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "SomberSmithingStone":
                    this.MarkerTypes["SomberSmithingStone"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['SomberSmithingStone']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "Question":
                    this.MarkerTypes["Question"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Question']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "MAP":
                    this.MarkerTypes["MAP"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['MAP']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "GravePickerBellBearing":
                    this.MarkerTypes["GravePickerBellBearing"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['GravePickerBellBearing']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "GhostPickerBellBearing":
                    this.MarkerTypes["GhostPickerBellBearing"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['GhostPickerBellBearing']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "BellBearing":
                    this.MarkerTypes["BellBearing"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['BellBearing']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "SmithingBellBearing":
                    this.MarkerTypes["SmithingBellBearing"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['SmithingBellBearing']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "SomberBellBearing":
                    this.MarkerTypes["SomberBellBearing"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['SomberBellBearing']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "GhostGlovewort":
                    this.MarkerTypes["GhostGlovewort"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['GhostGlovewort']}).bindPopup(marker.type +" "+marker.name))
                    break
                case "GraveGlovewort":
                    this.MarkerTypes["GraveGlovewort"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['GraveGlovewort']}).bindPopup(marker.type +" "+marker.name))
                    break
                default:
                    this.MarkerTypes["Other"].addLayer(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Other']}).bindPopup(marker.type +" "+marker.name))
                    break;
            }
        })
        console.log(this.filterType)
        if(this.filterType[0]!==""){
            this.filterType.forEach(type=>{
                this.MarkerTypes[type].addTo(this.MainMap)
            })
        }
        


        /*
            Map marker Section [End]
        */
        
        /*
            Control Panel Setting Section [Start]
        */
        L.control.attribution({
            position: 'bottomright',
            prefix: prefix,
        }).addTo(this.MainMap);
        L.control.zoom({ position: 'bottomright' }).addTo(this.MainMap);


        // var baseMaps = {
        //     "UnderGround 地底世界": underground,
        //     "Ground 地上世界": ground
        // };

        // // eslint-disable-next-line
        // var layerControl = L.control.layers(baseMaps).addTo(this.MainMap);

        /*
            Control Panel Setting Section [End]
        */
    },

}
</script>

<style scoped>
    .leaflet-container{
        background-color: #222222;
    }
    #map-container{
        width:100vw;
        height:93vh;
        background:#222222;
    }
    #mymap {
        width:100%;
        height:100%; 
        font: 10pt "Helvetica Neue", Arial, Helvetica, sans-serif;
    }
    

    .icon-container{
        margin:0px auto;
    }
    .lorem {
        font-style: italic;
        text-align: justify;
        color: pink;
    }
    .leaflet-control-zoom{
        border-image: url("@/assets/borderImage.png");
        border-image-repeat:round;
        border-image-slice:30 50 fill;
        border-image-width:25px 40px;
    }


</style>