

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


export default {
    name: 'MapView',

    data(){
        return {
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
            undergroundMapUrl:'https://imgs.ali213.net/picfile/eldenring_dx/{z}/{x}/{y}.png'
        }
    },
    created(){
        this.zoom = getCookie('zoom');
        this.initCenterLat = getCookie('centerlat');
        this.initCenterLng = getCookie('centerlng');
    },
    mounted(){
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

        //change map size when resizing and set cookies
        window.addEventListener('resize', () => {
            this.mapWidth = window.innerWidth;
            this.mapHeight = window.innerHeight;
        });

        //Map Listeners
        //zoom end
        MainMap.on('zoomend', () => {
            setCookie('zoom', MainMap.getZoom());
        })
        //move end
        MainMap.on('moveend',()=>{
            setCookie('centerlat', MainMap.getCenter().lat);
            setCookie('centerlng', MainMap.getCenter().lng);
        })

        var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
            denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
            aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
            golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

        var cities = L.layerGroup([littleton, denver, aurora, golden]);

        var overlayMaps = {
            "Cities": cities
        };
        
        //control panel setting
        L.control.zoom({ position: 'topright' }).addTo(MainMap);
        L.control.attribution({
            position: 'bottomright',
            prefix: prefix,
        }).addTo(MainMap);

        var baseMaps = {
            "UnderGround": underground,
            "Ground": ground
        };

        var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(MainMap);

        var crownHill = L.marker([39.75, -105.09]).bindPopup('This is Crown Hill Park.'),
            rubyHill = L.marker([39.68, -105.00]).bindPopup('This is Ruby Hill Park.');

        var parks = L.layerGroup([crownHill, rubyHill]);
        
        layerControl.addOverlay(parks, "Parks");
        // layerControl.removeLayer(parks);

        //add side bar
        L.control.sidebar({
            autopan: false, // whether to maintain the centered map point when opening the sidebar
            closeButton: true, // whether t add a close button to the panes
            container: "sidebar", // the DOM container or #ID of a predefined sidebar container that should be used
            position: "left" // left or right
            })
        .addTo(MainMap);


    }
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