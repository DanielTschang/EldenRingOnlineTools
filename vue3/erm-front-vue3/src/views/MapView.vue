

<template>
    <div id="map-container" >
    <div id="sidebar" class="leaflet-sidebar collapsed">

        <!-- nav tabs -->
        <div class="leaflet-sidebar-tabs">
            <!-- top aligned tabs -->
            <ul role="tablist">
                <li><a href="#home" role="tab"><i class="fa fa-bars active"></i></a></li>
                <li><a href="#autopan" role="tab"><i class="fa fa-arrows"></i></a></li>
                <li><a href="#autopan" role="tab"><i class="fa fa-arrows"></i></a></li>
            </ul>

            <!-- bottom aligned tabs -->
            <ul role="tablist">
                <li role="tab"><a href="https://github.com/nickpeihl/leaflet-sidebar-v2"><i class="fa fa-github"></i></a></li>
            </ul>
        </div>

        <!-- panel content -->
        <div class="leaflet-sidebar-content">
            <div class="leaflet-sidebar-pane" id="home">
                <h1 class="leaflet-sidebar-header">
                    zh-TW Elden Ring Online Map
                    <span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span>
                </h1>

                <p>A responsive sidebar for the mapping library <a href="https://leafletjs.com/">Leaflet</a>.</p>
                <p>Compatible with version 0.7 and 1.x (tested up to 1.6.0)</p>
                <p><b>Select the other panes for a showcase of each feature.</b></p>

                <h2>More examples</h2>
                <ul>
                    <li><a href="./position-right.html">Right aligned</a></li>
                    <li><a href="./halfheight.html">The sidebar adapts to map container size</a></li>
                    <li><a href="./leaflet-latest.html">Proof that it works with the latest leaflet version (if not, please report it!)</a></li>
                    <li><a href="./leaflet-0.7.html">Proof that it works with leaflet 0.7</a></li>
                </ul>

                <p class="lorem">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
        
            </div>

            <div class="leaflet-sidebar-pane" id="autopan">
                <h1 class="leaflet-sidebar-header">
                    autopan
                    <span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span>
                </h1>
                <p>
                    <code>Leaflet.control.sidebar({ autopan: true })</code>
                    makes shure that the map center always stays visible.
                </p>
                <p>
                    The autopan behviour is responsive as well.
                    Try opening and closing the sidebar from this pane!
                </p>
            </div>

            <div class="leaflet-sidebar-pane" id="messages">
                <h1 class="leaflet-sidebar-header">Messages<span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span></h1>
            </div>
        </div>
    </div>
        <div id="mymap" :style="{width: mapWidth + 'vw', height: mapHeight+'vh'}">
        </div>
    </div>
</template>




<script>
// @ is an alias to /src
import * as L from "leaflet";
import "leaflet-sidebar-v2";
import "@/css/leaflet-sidebar.css"
import { getCookie, setCookie } from '@/utils/Cookies';
import prefix from '@/utils/control-prefix'
import getMarkerByType from "@/utils/getMarker"
import MarkerIcon from "@/utils/markerIcon"


export default {
    name: 'MapView',

    data(){
        return {
            groundLayer:true,
            zoom:3,
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
        //地底地圖
        let underground = L.tileLayer(this.undergroundMapUrl, {
            attribution: '',
            maxZoom: this.maxZoom,
            id: 'underground',
            tileSize: this.tileSize,
            zoomOffset: this.zoomOffset
        })
        //地上地圖
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
        MainMap.on('baselayerchange',(e)=>{
            console.log(e)
            this.groundLayer = !this.groundLayer
            console.log(this.groundLayer)
        })

        /*
            Map Listeners Section [End]
        */


        /*
            Map marker Section [Start]
        */

        this.markers = await getMarkerByType("all")
        this.markers.forEach(marker=>{
            
            switch (marker.type) {
                case "SiteOfGrace":
                    this.SiteOfGrace.push(L.marker([marker.lat, marker.lng],{icon:MarkerIcon['SiteOfGrace']}).bindPopup(marker.name))
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

        //add side bar
        L.control.sidebar({
            autopan: false, // whether to maintain the centered map point when opening the sidebar
            closeButton: true, // whether t add a close button to the panes
            container: "sidebar", // the DOM container or #ID of a predefined sidebar container that should be used
            position: "left" // left or right
            })
        .addTo(MainMap);

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
        height: 100vh;
        width: 100vw;
        background:#222222;
    }
    #map {
        height: 1000px;
        width:1000px;
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