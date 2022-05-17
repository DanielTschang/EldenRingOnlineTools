

<template>
    <div id="map-container" >
    <div id="sidebar" class="leaflet-sidebar collapsed">

        <!-- nav tabs -->
        <div class="leaflet-sidebar-tabs">
            <!-- top aligned tabs -->
            <ul role="tablist">
                <li><a href="#home" role="tab"><i class="fa fa-bars active"></i></a></li>
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
                <p class="lorem">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                <p class="lorem">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
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

        <div id="mymap" class="h-full z-10">
        </div>
    </div>
</template>



<script>
// @ is an alias to /src
import * as L from "leaflet";
import "leaflet-sidebar-v2";
import "leaflet-sidebar-v2/css/leaflet-sidebar.css";


export default {
    name: 'HomeView',

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
            maxBounds:L.latLngBounds(L.latLng(-200, 200), L.latLng(200, -200)),
        }
    },
    mounted(){
        
        let underground = L.tileLayer('https://imgs.ali213.net/picfile/eldenring_dx/{z}/{x}/{y}.png', {
            attribution: '',
            maxZoom: this.maxZoom,
            id: 'underground',
            tileSize: this.tileSize,
            zoomOffset:this.zoomOffset
        })

        let ground = L.tileLayer('https://imgs.ali213.net/picfile/eldenring/{z}/{x}/{y}.jpg', {
            attribution: 'Elden Ring Map',
            maxZoom: this.maxZoom,
            id: 'ground',
            tileSize: this.tileSize,
            zoomOffset:this.zoomOffset,
            
        })


        let mymap = L.map("mymap", {
            maxZoom:this.maxZoom,
            minZoom:this.minZoom,
            attributionControl: false, 
            zoomControl: false, 
            maxBounds: this.maxBounds,
            renderer: L.canvas(),
            preferCanvas: true,
            layers: [ground,underground]
        }).setView([this.initCenterLat,this.initCenterLng],this.zoom);

        var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
            denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
            aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
            golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

        var cities = L.layerGroup([littleton, denver, aurora, golden]);

        var overlayMaps = {
            "Cities": cities
        };
        
        L.control.zoom({ position: 'topright' }).addTo(mymap);
        L.control.attribution({
            position: 'bottomright',
            prefix: `
                <a href="https://github.com/danieltschang" target="_blank">danchang11</a>
                |
                <a href="https://github.com/DanielTschang/zh-TW.EldenRingMap">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                    <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
                </svg>
                </a>
                `,
            })
        .addTo(mymap);

        var baseMaps = {
            "UnderGround": underground,
            "Ground": ground
        };

        var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(mymap);

        var crownHill = L.marker([39.75, -105.09]).bindPopup('This is Crown Hill Park.'),
            rubyHill = L.marker([39.68, -105.00]).bindPopup('This is Ruby Hill Park.');

        var parks = L.layerGroup([crownHill, rubyHill]);
        
        layerControl.addOverlay(parks, "Parks");
        L.control.sidebar({
            autopan: false, // whether to maintain the centered map point when opening the sidebar
            closeButton: true, // whether t add a close button to the panes
            container: "sidebar", // the DOM container or #ID of a predefined sidebar container that should be used
            position: "left" // left or right
            })
        .addTo(mymap);


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
        height: 100%;
        font: 10pt "Helvetica Neue", Arial, Helvetica, sans-serif;
    }
    

    .icon-container{
        margin:0px auto;
    }
    .lorem {
        font-style: italic;
        text-align: justify;
        color: #AAA;
    }
</style>