

<template>
    <div id="map-container" >
        <map-side-bar @changeTypes="changeTypes" :initfilterType="filterType" />
        
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
                    this.showLayer.addLayer(this.MarkerTypes[type])
                })
            }
            if(deletedType.length>0){
                deletedType.forEach(type => {
                    this.showLayer.removeLayer(this.MarkerTypes[type])
                    this.notshowLayer.addLayer(this.MarkerTypes[type])
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
            markerIDs:[],
            showLayer:L.layerGroup(),
            notshowLayer:L.layerGroup(),
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
            attribution: '<h style="color:white">Elden Ring Map</h>',
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
            let customPopup = marker.type + " : " + marker.name + "<hr><h4>"+marker.desc+"</h4><hr><input type='checkbox' id='" + marker.id + "'value='"+marker.id+ "'> <label for='"+marker.id+"'>已完成</label>";
            let customOptions =
                {
                    'maxWidth': '400',
                    'width': '200',
                    'className' : 'popupCustom'
                }
            let markerTmp = L.marker([marker.lat, marker.lng])
            switch (marker.type) {
                case "SiteOfGrace":
                    // eslint-disable-next-line 
                    markerTmp.setIcon(MarkerIcon['SiteOfGrace'])
                    this.MarkerTypes["SiteOfGrace"].addLayer(markerTmp.bindPopup(customPopup,customOptions));
                    
                    break;
                case "shortPath":
                    markerTmp.setIcon(MarkerIcon['ShortPath'])
                    this.MarkerTypes["ShortPath"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Waygates":
                    markerTmp.setIcon(MarkerIcon['Waygates'])
                    this.MarkerTypes["Waygates"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break    
                case "RuneFarm":
                    markerTmp.setIcon(MarkerIcon['RuneFarm'])
                    this.MarkerTypes["RuneFarm"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break  
                case "Shop":
                    markerTmp.setIcon(MarkerIcon['Shop'])
                    this.MarkerTypes["Shop"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "NPC":
                    markerTmp.setIcon(MarkerIcon["NPC"])
                    this.MarkerTypes["NPC"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Location":
                    // eslint-disable-next-line
                    markerTmp.setIcon(MarkerIcon["Location"](marker.level))         
                    this.MarkerTypes["Location"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "SummoningPool":
                    markerTmp.setIcon(MarkerIcon["SummoningPool"])
                    this.MarkerTypes["SummoningPool"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Cave":
                    markerTmp.setIcon(MarkerIcon['Cave'])
                    this.MarkerTypes["Cave"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "HorseTorrent":
                    markerTmp.setIcon(MarkerIcon['HorseTorrent'])
                    this.MarkerTypes["HorseTorrent"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "WalkingMausoleum":
                    markerTmp.setIcon(MarkerIcon['WalkingMausoleum'])
                    this.MarkerTypes["WalkingMausoleum"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "BigBoss":
                    markerTmp.setIcon(MarkerIcon['BigBoss'])
                    this.MarkerTypes["BigBoss"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Boss":
                    markerTmp.setIcon(MarkerIcon['Boss'])
                    this.MarkerTypes["Boss"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "LittleBoss":
                    markerTmp.setIcon(MarkerIcon['LittleBoss'])
                    this.MarkerTypes["LittleBoss"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "NPCInvaders":
                    markerTmp.setIcon(MarkerIcon['NPCInvaders'])
                    this.MarkerTypes["NPCInvaders"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "GreatEnemy":
                    markerTmp.setIcon(MarkerIcon['GreatEnemy'])
                    this.MarkerTypes["GreatEnemy"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Item":
                    markerTmp.setIcon(MarkerIcon['Item'])
                    this.MarkerTypes["Item"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Cartacombs":
                    markerTmp.setIcon(MarkerIcon['Cartacombs'])
                    this.MarkerTypes["Cartacombs"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Evergaol":
                    markerTmp.setIcon(MarkerIcon['Evergaol'])
                    this.MarkerTypes["Evergaol"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "GoldenSeed":
                    markerTmp.setIcon(MarkerIcon['GoldenSeed'])
                    this.MarkerTypes["GoldenSeed"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "CrystalTears":
                    markerTmp.setIcon(MarkerIcon['CrystalTears'])
                    this.MarkerTypes["CrystalTears"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "KeyItems":
                    markerTmp.setIcon(MarkerIcon['KeyItems'])
                    this.MarkerTypes["KeyItems"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "StoneSwordKey":
                    markerTmp.setIcon(MarkerIcon['StoneSwordKey'])
                    this.MarkerTypes["StoneSwordKey"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "DeathRoot":
                    markerTmp.setIcon(MarkerIcon['DeathRoot'])
                    this.MarkerTypes["DeathRoot"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "DragonHeart":
                    markerTmp.setIcon(MarkerIcon['DragonHeart'])
                    this.MarkerTypes["DragonHeart"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "LarvalTear":
                    markerTmp.setIcon(MarkerIcon['LarvalTear'])
                    this.MarkerTypes["LarvalTear"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "SacredTear":
                    markerTmp.setIcon(MarkerIcon['SacredTear'])
                    this.MarkerTypes["SacredTear"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Painting":
                    markerTmp.setIcon(MarkerIcon['Painting'])
                    this.MarkerTypes["Painting"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Gesture":
                    markerTmp.setIcon(MarkerIcon['Gesture'])
                    this.MarkerTypes["Gesture"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Material":
                    markerTmp.setIcon(MarkerIcon['Material'])
                    this.MarkerTypes["Material"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Sorceries":
                    markerTmp.setIcon(MarkerIcon['Sorceries'])
                    this.MarkerTypes["Sorceries"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Weapon":
                    markerTmp.setIcon(MarkerIcon['Weapon'])
                    this.MarkerTypes["Weapon"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Cookbook":
                    markerTmp.setIcon(MarkerIcon['Cookbook'])
                    this.MarkerTypes["Cookbook"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Whetblade":
                    markerTmp.setIcon(MarkerIcon['Whetblade'])
                    this.MarkerTypes["Whetblade"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Incantation":
                    markerTmp.setIcon(MarkerIcon['Incantation'])
                    this.MarkerTypes["Incantation"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Tailsman":
                    markerTmp.setIcon(MarkerIcon['Tailsman'])
                    this.MarkerTypes["Tailsman"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "AshOfWar":
                    markerTmp.setIcon(MarkerIcon['AshOfWar'])
                    this.MarkerTypes["AshOfWar"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "SpiritAsh":
                    markerTmp.setIcon(MarkerIcon['SpiritAsh'])
                    this.MarkerTypes["SpiritAsh"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Armor":
                    markerTmp.setIcon(MarkerIcon['Armor'])
                    this.MarkerTypes["Armor"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Warn":
                    markerTmp.setIcon(MarkerIcon['Warn'])
                    this.MarkerTypes["Warn"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Taoke":
                    markerTmp.setIcon(MarkerIcon['Taoke'])
                    this.MarkerTypes["Taoke"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "SmithingStone":
                    markerTmp.setIcon(MarkerIcon['SmithingStone'])
                    this.MarkerTypes["SmithingStone"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "SomberSmithingStone":
                    markerTmp.setIcon(MarkerIcon['SomberSmithingStone'])
                    this.MarkerTypes["SomberSmithingStone"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Question":
                    markerTmp.setIcon(MarkerIcon['Question'])
                    this.MarkerTypes["Question"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "MAP":
                    markerTmp.setIcon(MarkerIcon['MAP'])
                    this.MarkerTypes["MAP"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "GravePickerBellBearing":
                    markerTmp.setIcon(MarkerIcon['GravePickerBellBearing'])
                    this.MarkerTypes["GravePickerBellBearing"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "GhostPickerBellBearing":
                    markerTmp.setIcon(MarkerIcon['GhostPickerBellBearing'])
                    this.MarkerTypes["GhostPickerBellBearing"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "BellBearing":
                    markerTmp.setIcon(MarkerIcon['BellBearing'])
                    this.MarkerTypes["BellBearing"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "SmithingBellBearing":
                    markerTmp.setIcon(MarkerIcon['SmithingBellBearing'])
                    this.MarkerTypes["SmithingBellBearing"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "SomberBellBearing":
                    markerTmp.setIcon(MarkerIcon['SomberBellBearing'])
                    this.MarkerTypes["SomberBellBearing"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "GhostGlovewort":
                    markerTmp.setIcon(MarkerIcon['GhostGlovewort'])
                    this.MarkerTypes["GhostGlovewort"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "GraveGlovewort":
                    markerTmp.setIcon(MarkerIcon['GraveGlovewort'])
                    this.MarkerTypes["GraveGlovewort"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                default:
                    markerTmp.setIcon(MarkerIcon['Other'])
                    this.MarkerTypes["Other"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break;
            }
            markerTmp._leaflet_id = marker.id
        })

        if(this.filterType!==[]){
            this.filterType.forEach(type=>{
                this.MarkerTypes[type].addTo(this.showLayer)
            })
        }
        
        this.showLayer.addTo(this.MainMap)


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