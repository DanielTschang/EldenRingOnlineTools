<template>
  <div id="mymap" class="h-full z-10">
  </div>
</template>

<script>
// @ is an alias to /src
import L from "leaflet";
export default {
    name: 'HomeView',

    data(){
        return {
            maxZoom:7,
            minZoom:2,
            tileSize:200,
            zoomOffset:0,
            maxBounds: [
                [-200, 200],
                [200, -200]
            ],
            maxBoundsBywin:L.latLngBounds(L.latLng(-100, -200), L.latLng(100, 100)),
        }
    },
    mounted(){
        var littleton = L.marker([0, 0]).bindPopup('This is Littleton, CO.'),
            denver    = L.marker([39.74, 0]).bindPopup('This is Denver, CO.'),
            aurora    = L.marker([39.73, 4.8]).bindPopup('This is Aurora, CO.'),
            golden    = L.marker([39.77, 5.23]).bindPopup('This is Golden, CO.');
        var cities = L.layerGroup([littleton, denver, aurora, golden]);
        var none = L.layerGroup([]);


        var overlayMaps = {
            "Cities": cities,
            "None": none
        };
        let ground = L.tileLayer('https://imgs.ali213.net/picfile/eldenring/{z}/{x}/{y}.jpg', {
            attribution: 'Elden Ring Map',
            maxZoom: this.maxZoom,
            id: 'ground',
            tileSize: this.tileSize,
            zoomOffset:this.zoomOffset,
            
        })
        let underground = L.tileLayer('https://imgs.ali213.net/picfile/eldenring_dx/{z}/{x}/{y}.png', {
            attribution: '',
            maxZoom: this.maxZoom,
            id: 'underground',
            tileSize: this.tileSize,
            zoomOffset:this.zoomOffset
        })
        // var baseMaps = {
        //     "UnderGround": underground,
        //     "Ground": ground
        // };
        let mymap = L.map("mymap", {
            maxZoom:this.maxZoom,
            minZoom:this.minZoom,
            attributionControl: false, 
            zoomControl: false, 
            maxBounds: this.maxBounds,
            layers : [underground,ground]
        }).setView([0,0],4);


        L.control.layers(overlayMaps).addTo(mymap);
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
    }
}
</script>

<style scoped>
    #mymap{
        height: 80vh;
        width: 80vw
    }
</style>