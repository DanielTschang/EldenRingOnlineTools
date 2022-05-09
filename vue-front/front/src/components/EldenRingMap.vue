<template>
  <div ref="map" class="map">
      <LTileLayer :url="layer.url" :attribution="layer.attribution" :tileSize="tileSize"  ></LTileLayer>
  </div>
</template>

<script>
export default {

    data() {
        return {
            iconsize:[25, 25],
            zoom:6,
            center: L.latLng(0,0),
            layerIndex: 0,
            maxZoom:7,
            minZoom:2,
            tileSize:200,
            zoomOffset:0,
            maxBounds: latLngBounds([
                [-200, 200],
                [200, -200]
            ]),

            layers:[
                {
                    url:'https://imgs.ali213.net/picfile/eldenring/{z}/{x}/{y}.jpg',
                    attribution:'&copy; <a target="_blank" href="https://danieltschang.github.io/">danchang11</a> contributors',
                },
                {
                    url:'https://imgs.ali213.net/picfile/eldenring_dx/{z}/{x}/{y}.png',
                    attribution:'&copy; <a target="_blank" href="https://danieltschang.github.io/">danchang11</a> contributors',
                }
            ]
        }
    },
    mounted(){
        this.initMap();
        setTimeout(()=>{
            this.initLocation()
        },100)
    },
    methods:{
        initMap(){
            this.map=L.map(this.$refs.map).setView(0,0);
        },
        latLng (lat, lng) {
          return L.latLng(lat,lng);  
        },
        zoomUpdated (zoom) {
            this.zoom = zoom;
        },
        centerUpdated (center) {
            this.center = center;
        },
        boundsUpdated (bounds) {
            this.bounds = bounds;
        }

    },
    computed: {
        layer () {
            return this.layers[this.layerIndex]
        }
    },

}
</script>

<style>
    .map {
        height: 75vh;
        width: 90vw;
    }
</style>