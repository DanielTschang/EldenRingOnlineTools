

<template>
    <div id="map-container" >
        <map-side-bar/>
        
        <div id="mymap">
        </div>
    </div>
</template>




<script>
// @ is an alias to /src
import * as L from "leaflet";
// import "leaflet-sidebar-v2";
// import "@/css/leaflet-sidebar.css"
import { getCookie, setCookie } from '@/utils/Cookies';
import prefix from '@/utils/control-prefix'
import getMarkerByType from "@/utils/getMarker"
import MarkerIcon from "@/utils/markerIcon"
import MapSideBar from "@/components/sidebar/MapSideBar.vue"
import "leaflet/dist/leaflet.css"
import "@/css/customstyle.css"


export default {
    name: 'MapView',
    components:{
        MapSideBar
    },

    data(){
        return {
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
            undergroundMapUrl:'https://imgs.ali213.net/picfile/eldenring_dx/{z}/{x}/{y}.png',
            SiteOfGrace : [],
            shortPath : [],
            Waygates : [],
            RuneFarm : [],
            Shop : [],
            NPC : [],
            Location : [],
            SummoningPool : [],
            Cave : [],
            HorseTorrent : [],
            WalkingMausoleum : [],
            BigBoss : [],
            Boss : [],
            LittleBoss : [],
            NPCInvaders : [],
            GreatEnemy : [],
            Item : [],
            Cartacombs : [],
            Evergaol : [],
            GoldenSeed : [],
            CrystalTears : [],
            KeyItems : [],
            StoneSwordKey : [],
            DeathRoot : [],
            DragonHeart : [],
            LarvalTear : [],
            PickersBellBearing : [],
            SacredTear : [],
            MinersBellBearing : [],
            Painting : [],
            Gesture : [],
            Material : [],
            Sorceries : [],
            Weapon : [],
            Cookbook : [],
            Whetblade : [],
            Other : [],
            Incantation : [],
            Tailsman : [],
            AshOfWar : [],
            SpiritAsh : [],
            Armor : [],
            SomberSmithingStone  : [],
            MAP : [],
            Text : [],
            Warn : [],
            SmithingStone : [],
            Taoke : [],
            Question : [],
            BellBearing : [],
            SmithingBellBearing : [],
            SomberBellBearing : [],
            GraveGlovewort : [],
            GravePickerBellBearing : [],
            GhostGlovewort : [],
            GhostPickerBellBearing : [],
        }
    },
    async created(){
        let zoomCookie = getCookie('zoom');
        let latCookie = getCookie('centerlat');
        let lngCookie = getCookie('centerlng');

        this.zoom = zoomCookie == "" ? this.zoom : zoomCookie ;
        this.initCenterLat = latCookie == "" ? this.initCenterLat : latCookie;
        this.initCenterLng = lngCookie == "" ? this.initCenterLng : lngCookie;
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
        var MainMap = L.map("mymap", {
            maxZoom:this.maxZoom,
            minZoom:this.minZoom,
            attributionControl: false, 
            zoomControl: false, 
            maxBounds: this.maxBounds,
            renderer: L.canvas(),
            preferCanvas: true,
            layers: [ground,underground]
        }).setView([this.initCenterLat,this.initCenterLng],this.zoom);

        /*
            Map Init Section [End]
        */

        /*
            Map Listeners Section [Start]
        */

        //zoom end
        MainMap.on('zoomend', () => {
            setCookie('zoom', MainMap.getZoom());
        })
        //move end
        MainMap.on('moveend',()=>{
            setCookie('centerlat', MainMap.getCenter().lat);
            setCookie('centerlng', MainMap.getCenter().lng);
        })
        //baselayerchange
        // MainMap.on('baselayerchange',(e)=>{
        //     console.log(e)
        //     this.groundLayer = !this.groundLayer
        //     console.log(this.groundLayer)
        // })

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
                    this.SiteOfGrace.push(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['SiteOfGrace']}).bindPopup(customPopup,customOptions));
                    break;
                case "shortPath":
                    this.shortPath.push(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['shortPath']}).bindPopup(marker.name))
                    break
                case "Waygates":
                    this.Waygates.push(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Waygates']}).bindPopup(marker.name))
                    break    
                case "RuneFarm":
                    this.RuneFarm.push(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['RuneFarm']}).bindPopup(marker.name))
                    break  
                case "Shop":
                    this.Shop.push(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Shop']}).bindPopup(marker.name))
                    break
                case "NPC":
                    this.NPC.push(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['NPC']}).bindPopup(marker.name))
                    break
                case "Location":
                    this.Location.push(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['Location']}).bindPopup(marker.name))
                    break
                // case "shortPath":
                //     this.shortPath
                //     break
                // case "shortPath":
                //     this.shortPath
                //     break
                // case "shortPath":
                //     this.shortPath
                //     break
                // case "shortPath":
                //     this.shortPath
                //     break
                // case "shortPath":
                //     this.shortPath
                //     break
                // case "shortPath":
                //     this.shortPath
                //     break
                // case "shortPath":
                //     this.shortPath
                //     break
                // case "shortPath":
                //     this.shortPath
                //     break
                // case "shortPath":
                //     this.shortPath
                //     break
                // case "shortPath":
                //     this.shortPath
                //     break
                // default:
                //     break;
            }
        })

        var overlayMaps = {
            "Site Of Grace 賜福點": L.layerGroup(this.SiteOfGrace),
            "Short Path 捷徑": L.layerGroup(this.shortPath),
            "Way Gates 傳送點": L.layerGroup(this.Waygates),
            "Rune Farm 刷魂點": L.layerGroup(this.RuneFarm),
            "Shop 商店" : L.layerGroup(this.Shop),
            "NPC": L.layerGroup(this.NPC),
            "Location 地點":L.layerGroup(this.Location), 
        };

        /*
            Map marker Section [End]
        */
        
        /*
            Control Panel Setting Section [Start]
        */
        L.control.zoom({ position: 'topright' }).addTo(MainMap);
        L.control.attribution({
            position: 'bottomright',
            prefix: prefix,
        }).addTo(MainMap);

        var baseMaps = {
            "UnderGround 地底世界": underground,
            "Ground 地上世界": ground
        };

        // eslint-disable-next-line
        var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(MainMap);

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

</style>