<template>

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
                    <LIcon>
                        <!-- <canvas-marker /> -->
                        <!-- <IconMarker :name="marker.name" :url="getIconUrl(marker.type)" :show="showText(zoom)" /> -->
                        <div class="map-label">
                            <img class="map-label-image" :src="getIconUrl(marker.type)">
                            <h4 ref="maptext" class="map-label-text">{{marker.name}}</h4>
                            
                        </div>
                    </LIcon>
                </LMarker>

            <LControlAttribution position="topright" prefix="" />
            <LControlZoom position="bottomright" > </LControlZoom>
        </LMap>
    </div>

</template>

<script>
import L, {latLngBounds} from 'leaflet';
import { LMap, LTileLayer, LControlAttribution, LControlZoom, LPopup, LMarker, LIcon } from 'vue2-leaflet';
import iconurl from './IconUrl.json'


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
 
    },
    props:{
        markers:Array
    },
    data() {
        return {
            map:null,
            iconUrl:iconurl,
            iconSize:[35, 35],
            shadowSize:[35,35],
            zoom:6,
            center: L.latLng(-30.505484, -73.344727),
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
            let hi = this.$refs.maptext
            console.log(hi)
            //幹為啥改不了啊
            if( this.zoom <5){
                hi.forEach(each=>{
                    if(!each.classList.value.includes("hideText")){
                        each.classList.value = each.classList.value + ' hideText'
                    }
                }) 
            }else{
                hi.forEach(each=>{
                    if(each.classList.value.includes("hideText")){
                        each.classList.value = each.classList.value.replace(' hideText','')
                    }
                }) 
            }
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
        },
        hideClass(){
            if (this.zoom > 5){
                this.$refs.classList.value
            }else{
                this.$
            }
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
        margin:10px 10px;
        padding:10px 10px;
        height: 85vh;
        width: 100vw;
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
    .leaflet-div-icon {
        width:300px;
        height:0;
        border: 0;
        padding: 0;
    }
    *{
        margin:0;
        padding:0;
    }
    .map-label {
        position: relative;
        bottom: 0;
        left: -50%;
        display: flex;
        flex-direction: row;
        text-align: center;
        width:3vw;
        height:3vh;
        
    }
    .map-label-image{
        position: relative; 
    }

    .map-label-text {
        position: relative; 
        padding: 3px;
        white-space: nowrap;

    }

    .hideText{
        visibility:hidden;
    }


</style>