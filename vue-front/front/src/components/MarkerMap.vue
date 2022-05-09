<template>
    <div>
    <div>
        <button @click="layerIndex = 0">地面</button> <button @click="layerIndex = 1">地底</button>
        <button @click="openpop">pop</button>
        <h3>{{zoom}}, {{center}}</h3>
    </div>
    <div class="row map">
        <LMap ref="MyMap" :zoom="zoom" :options="{attributionControl: false, zoomControl: false, preferCanvas:true}"  :maxZoom="maxZoom" :minZoom="minZoom" :center="center" :maxBounds="maxBounds"
            @ready="initMap()"
            @update:zoom="zoomUpdated"
            @update:center="centerUpdated"
            @update:bounds="boundsUpdated"
        >
            <LTileLayer :url="layer.url" :attribution="layer.attribution" :tileSize="tileSize" />
                <LMarker :key="marker.id" v-for="marker in markers" :lat-lng="latLng(marker.lat, marker.lng)" >
                    <LPopup>{{marker.name}} {{marker.type}}</LPopup>
                    <LIcon
                        :icon-size="iconSize"
                        class-name="iconName"
                        :shadow-url="shadowUrl"
                        :shadow-size="shadowSize"
                        :icon-url="getIconUrl(marker.type)"
                        :shadow-anchor="shadowAnchor"
                    >
                        <CanvasMarker :name="marker.name" :imgurl="haha" />
                    <!-- <div
                        style="width: 50px; height: 50px; border: 1px solid blue; background-color:red"
                    >
                        <canvas id="myCanvas" width="50" height="50"></canvas>
                        <img style="width:2vw" src="https://eldenring.wiki.fextralife.com/file/Elden-Ring/morgotts-great-rune-key-item-elden-ring-wiki-guide.png">
                        <h style="">{{marker.name}}</h> 
                    </div> -->
                    </LIcon>
                </LMarker>

            <LControlAttribution position="topright" prefix="" />
            <LControlZoom position="bottomright" > </LControlZoom>
        </LMap>
    </div>
    </div>
</template>

<script>
import L, {latLngBounds} from 'leaflet';
import { LMap, LTileLayer, LControlAttribution, LControlZoom, LPopup, LMarker, LIcon } from 'vue2-leaflet';
import iconurl from './IconUrl.json'
import CanvasMarker from './CanvasMarker.vue'


export default {
    name: 'MarkerMap',
    components: {
        LTileLayer,
        LControlAttribution,
        LControlZoom,
        LMap,
        LMarker,
        LPopup,
        LIcon,
        CanvasMarker
        // LTooltip
    },
    props:{
        markers:Array
    },
    // mounted: function(){
    //     this.iconUrl = iconurl
    // },
    data() {
        return {
            map:null,
            iconUrl:iconurl,
            iconSize:[35, 35],
            shadowSize:[35,35],
            zoom:6,
            center: L.latLng(-17.659488, -76.80542),
            layerIndex: 0,
            maxZoom:7,
            minZoom:2,
            tileSize:200,
            zoomOffset:0,
            maxBounds: latLngBounds([
                [-200, 200],
                [200, -200]
            ]),
            shadowUrl:require("../../node_modules/leaflet/dist/images/marker-shadow.png")
            ,
            shadowAnchor: [5,10]
            ,
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
    methods:{
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
        },
        openpop(){
            this.map.flyTo(this.center, 5);
            this.map.setView(this.center)
            

        },
        initMap(){
            this.map = this.$refs.MyMap.mapObject;
        },
        getIconUrl(type){
            return this.iconUrl[type]
        }
    },
    computed: {
        layer () {
            return this.layers[this.layerIndex]
        }
    },

};
</script>

<style scoped>
    .map {
        height: 75vh;
        width: 90vw;
    }
    .someExtraClass {
        text-align: left;
        display:flex;
        flex-direction: column;
        float:left;
        display:inline
    }
    .iconName{
        background-color: aqua;
        padding: 10px;
        border: 1px solid #333;
        border-radius: 0 20px 20px 20px;
        box-shadow: 5px 3px 10px rgba(0, 0, 0, 0.2);
        text-align: center;
        width: auto !important;
        height: auto !important;
        margin: 0 !important;
    }
</style>