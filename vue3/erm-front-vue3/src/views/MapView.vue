

<template>
    <div id="map-container" >
        <map-side-bar @changeTypes="changeTypes" :initfilterType="filterType" :initMapLayer="maplayer" @ToggleMapChange="ToggleMapChange" />
        
        <div id="mymap">
        </div>
    </div>
</template>


<script>
/* eslint-disable */
import "leaflet";
import "@/plugins/_full.js";
import { getCookie, setCookie } from '@/utils/Cookies';
import prefix from '@/utils/control-prefix'
import getMarkerByType from "@/utils/getMarker"
import MarkerIcon from "@/utils/markerIcon"
import MapSideBar from "@/components/sidebar/MapSideBar.vue"
import "@/css/leaflet.css"
import "@/css/customstyle.css"


export default {

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
                    if (this.DOMShowTypes.includes(type)){
                        this.DomShowLayer.addLayer(this.MarkerTypes[type])
                    }else{
                        this.CanvasShowLayer.addMarkers(this.MarkerTypes[type])
                    }
                })
            }
            if(deletedType.length>0){
                deletedType.forEach(type => {
                    if (this.DOMShowTypes.includes(type)){
                        this.DomShowLayer.removeLayer(this.MarkerTypes[type])
                    }else{
                        this.MarkerTypes[type].forEach(eachMarker=>{
                            this.CanvasShowLayer.removeMarker(eachMarker)
                        })
                    }

                    

                })
            }
            this.CanvasShowLayer.redraw(this.showText)
            this.updateMarkers()
        },
        ToggleshowCollected(show){
            //等會員用好再完成
            if(this.showCollected!==show){
                this.showCollected=show
                if(this.showCollected){
                    console.log('')
                }
                else{
                    console.log('')
                }
            }
        },
        ToggleShowEndGame(show){
            if(this.showEndGame!==show){
                if(show){
                    this.showLayer.eachLayer(layer=>{
                        layer.eachLayer(layer_child=>{
                        if(layer_child.position=2){
                            layer_child._icon.style.display = '';
                        }
                    })
            })
                }
            }
            this.showEndGame = show;
        },
        ToggleMapChange(level){
            this.maplayer = level
            if(level==0){
                this.MainMap.removeLayer(this.undergroundMap)
                this.MainMap.addLayer(this.groundMap)
            }
            else{
                this.MainMap.removeLayer(this.groundMap)
                this.MainMap.addLayer(this.undergroundMap)
            }
            
            this.updateMarkers()
            setCookie("maplayer", level)
            
        },
        updateMarkers(){
            this.showLayer.eachLayer(layer=>{
                layer.eachLayer(layer_child=>{
                    //show End Game or not 灰城
                    if(layer_child.position=2){
                        if(this.showEndGame){
                            layer_child._icon.style.display = '';
                        }
                    }
                    //show Collected
                    if(this.collected.includes(layer_child.marker_id)){
                        if(this.showCollected){
                            layer_child._icon.style.display = '';
                        }
                        else{
                            layer_child._icon.style.display = 'none';
                        }
                    }

                    if(layer_child.is_underground==this.maplayer){
                        layer_child._icon.style.display = '';
                    }
                    else{
                        layer_child._icon.style.display = 'none';
                    }
                    
                    

                })
            })
        }
    },
    data(){
        return {
            GameVersion: "1.04",
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
            showCollected:true,
            showEndGame:false,
            showText:true,
            maxBounds:L.latLngBounds(L.latLng(-100, -200), L.latLng(100, 100)),
            //地上地圖 Ground map layer
            groundMapUrl:'https://imgs.ali213.net/picfile/eldenring/{z}/{x}/{y}.jpg',
            groundMap:null,
            //地底地圖 Underground map layer
            undergroundMapUrl:'https://imgs.ali213.net/picfile/eldenring_dx/{z}/{x}/{y}.png',
            undergroundMap:null,
            collected:[],
            filterType: [],
            markerIDs:[],
            maplayer:0,
            DOMShowTypes:['Location','BigBoss'],
            CanvasShowLayer : L.canvasIconLayer({}),
            DomShowLayer:L.layerGroup(),
            MarkerTypes: {
                "Location" : L.layerGroup(),
                "BigBoss" : L.layerGroup(),
                "SiteOfGrace" : [],
                "ShortPath" : [],
                "Waygates" : [],
                "RuneFarm" : [],
                "Shop" : [],
                "NPC" : [],
                "SummoningPool" : [],
                "Cave" : [],
                "HorseTorrent" : [],
                "WalkingMausoleum" : [],
                "Boss" : [],
                "LittleBoss" : [],
                "NPCInvaders" : [],
                "GreatEnemy" : [],
                "Item" : [],
                "Cartacombs" : [],
                "Evergaol" : [],
                "GoldenSeed" : [],
                "CrystalTears" : [],
                "KeyItems" : [],
                "StoneSwordKey" : [],
                "DeathRoot" : [],
                "DragonHeart" : [],
                "LarvalTear" : [],
                "PickersBellBearing" : [],
                "SacredTear" : [],
                "MinersBellBearing" : [],
                "Painting" : [],
                "Gesture" : [],
                "Material" : [],
                "Sorceries" : [],
                "Weapon" : [],
                "Cookbook" : [],
                "Whetblade" : [],
                "Other" : [],
                "Incantation" : [],
                "Tailsman" : [],
                "AshOfWar" : [],
                "SpiritAsh" : [],
                "Armor" : [],
                "SomberSmithingStone" : [],
                "MAP" : [],
                "Text" : [],
                "Warn" : [],
                "SmithingStone" : [],
                "Taoke" : [],
                "Question" : [],
                "BellBearing" : [],
                "SmithingBellBearing" : [],
                "SomberBellBearing" : [],
                "GraveGlovewort" : [],
                "GravePickerBellBearing" : [],
                "GhostGlovewort" : [],
                "GhostPickerBellBearing" : [],
            },
            
        }
    },
    async created(){
        let zoomCookie = getCookie('zoom');
        let latCookie = getCookie('centerlat');
        let lngCookie = getCookie('centerlng');
        let TypeCookie = getCookie('filterType');
        let mapLayerCookie = getCookie('maplayer')
        

        this.zoom = zoomCookie == "" ? this.zoom : zoomCookie ;
        this.initCenterLat = latCookie == "" ? this.initCenterLat : latCookie;
        this.initCenterLng = lngCookie == "" ? this.initCenterLng : lngCookie;
        this.filterType = TypeCookie == "" ? ["Location"] : TypeCookie.split(",")
        this.maplayer = mapLayerCookie == "" ? 0 : Number(mapLayerCookie);
        
    },
    async mounted(){
        /*
            Map Init Section [Start]
        */


        this.groundMap = L.tileLayer(this.groundMapUrl, {
                attribution: '<h style="color:white">Elden Ring Map | Game Version : '+this.GameVersion+'</h>',
                maxZoom: this.maxZoom,
                id: 'ground',
                tileSize: this.tileSize,
                zoomOffset: this.zoomOffset,
            }),
        
        this.undergroundMap = L.tileLayer(this.undergroundMapUrl, {
                attribution: '<h style="color:white">Elden Ring Map | Game Version : '+this.GameVersion+'</h>',
                maxZoom: this.maxZoom,
                id: 'underground',
                tileSize: this.tileSize,
                zoomOffset: this.zoomOffset
            }),

        //init Map
        this.MainMap = L.map("mymap", {
            maxZoom:this.maxZoom,
            minZoom:this.minZoom,
            attributionControl: false, 
            zoomControl: false, 
            maxBounds: this.maxBounds,
            renderer: L.canvas(),
            preferCanvas: true,
        }).setView([this.initCenterLat,this.initCenterLng],this.zoom);

        //init Layers
        this.CanvasShowLayer.addTo(this.MainMap)
        this.DomShowLayer.addTo(this.MainMap)

        if(this.maplayer==0){
            this.groundMap.addTo(this.MainMap)
        }else{
            this.undergroundMap.addTo(this.MainMap)
        }

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
            let markerTmp = L.marker([marker.lat, marker.lng],{renderer: L.canvas({padding:0.5})})
            markerTmp.marker_id = marker.id;
            markerTmp.position = marker.position;
            markerTmp.is_underground = marker.is_underground;
            switch (marker.type) {
                case "SiteOfGrace":
                    // eslint-disable-next-line 
                    markerTmp.setIcon(MarkerIcon['SiteOfGrace'](marker.name))
                    this.MarkerTypes["SiteOfGrace"].push(markerTmp.bindPopup(customPopup,customOptions));  
                    break;
                case "shortPath":
                    markerTmp.setIcon(MarkerIcon['ShortPath'](marker.name))
                    this.MarkerTypes["ShortPath"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Waygates":
                    markerTmp.setIcon(MarkerIcon['Waygates'](marker.name))
                    this.MarkerTypes["Waygates"].push(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break    
                case "RuneFarm":
                    markerTmp.setIcon(MarkerIcon['RuneFarm'](marker.name))
                    this.MarkerTypes["RuneFarm"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break  
                case "Shop":
                    markerTmp.setIcon(MarkerIcon['Shop'](marker.name))
                    this.MarkerTypes["Shop"].push(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "NPC":
                    markerTmp.setIcon(MarkerIcon["NPC"](marker.name))
                    this.MarkerTypes["NPC"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Location":
                    // eslint-disable-next-line
                    markerTmp.setIcon(MarkerIcon["Location"](marker.name,marker.level))
                    this.MarkerTypes["Location"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "SummoningPool":
                    markerTmp.setIcon(MarkerIcon["SummoningPool"](marker.name))
                    this.MarkerTypes["SummoningPool"].push(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Cave":
                    markerTmp.setIcon(MarkerIcon['Cave'](marker.name))
                    this.MarkerTypes["Cave"].push(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "HorseTorrent":
                    markerTmp.setIcon(MarkerIcon['HorseTorrent'](marker.name))
                    this.MarkerTypes["HorseTorrent"].push(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "WalkingMausoleum":
                    markerTmp.setIcon(MarkerIcon['WalkingMausoleum'](marker.name))
                    this.MarkerTypes["WalkingMausoleum"].push(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "BigBoss":
                    markerTmp.setIcon(MarkerIcon['BigBoss'](marker.level))
                    this.MarkerTypes["BigBoss"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Boss":
                    markerTmp.setIcon(MarkerIcon['Boss'](marker.name))
                    this.MarkerTypes["Boss"].push(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "LittleBoss":
                    markerTmp.setIcon(MarkerIcon['LittleBoss'](marker.name))
                    this.MarkerTypes["LittleBoss"].push(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "NPCInvaders":
                    markerTmp.setIcon(MarkerIcon['NPCInvaders'](marker.name))
                    this.MarkerTypes["NPCInvaders"].push(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "GreatEnemy":
                    markerTmp.setIcon(MarkerIcon['GreatEnemy'](marker.name))
                    this.MarkerTypes["GreatEnemy"].push(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Item":
                    markerTmp.setIcon(MarkerIcon['Item'](marker.name))
                    this.MarkerTypes["Item"].push(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Cartacombs":
                    markerTmp.setIcon(MarkerIcon['Cartacombs'](marker.name))
                    this.MarkerTypes["Cartacombs"].push(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Evergaol":
                    markerTmp.setIcon(MarkerIcon['Evergaol'](marker.name))
                    this.MarkerTypes["Evergaol"].push(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "GoldenSeed":
                    markerTmp.setIcon(MarkerIcon['GoldenSeed'](marker.name))
                    this.MarkerTypes["GoldenSeed"].push(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "CrystalTears":
                    markerTmp.setIcon(MarkerIcon['CrystalTears'](marker.name))
                    this.MarkerTypes["CrystalTears"].push(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "KeyItems":
                    markerTmp.setIcon(MarkerIcon['KeyItems'](marker.name))
                    this.MarkerTypes["KeyItems"].push(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "StoneSwordKey":
                    markerTmp.setIcon(MarkerIcon['StoneSwordKey'](marker.level))
                    this.MarkerTypes["StoneSwordKey"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "DeathRoot":
                    markerTmp.setIcon(MarkerIcon['DeathRoot'](marker.name))
                    this.MarkerTypes["DeathRoot"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "DragonHeart":
                    markerTmp.setIcon(MarkerIcon['DragonHeart'](marker.name))
                    this.MarkerTypes["DragonHeart"].push(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "LarvalTear":
                    markerTmp.setIcon(MarkerIcon['LarvalTear'](marker.name))
                    this.MarkerTypes["LarvalTear"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "SacredTear":
                    markerTmp.setIcon(MarkerIcon['SacredTear'](marker.name))
                    this.MarkerTypes["SacredTear"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Painting":
                    markerTmp.setIcon(MarkerIcon['Painting'](marker.name))
                    this.MarkerTypes["Painting"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Gesture":
                    markerTmp.setIcon(MarkerIcon['Gesture'](marker.name))
                    this.MarkerTypes["Gesture"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Material":
                    markerTmp.setIcon(MarkerIcon['Material'](marker.name))
                    this.MarkerTypes["Material"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Sorceries":
                    markerTmp.setIcon(MarkerIcon['Sorceries'](marker.name))
                    this.MarkerTypes["Sorceries"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Weapon":
                    markerTmp.setIcon(MarkerIcon['Weapon'](marker.name))
                    this.MarkerTypes["Weapon"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Cookbook":
                    markerTmp.setIcon(MarkerIcon['Cookbook'](marker.name))
                    this.MarkerTypes["Cookbook"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Whetblade":
                    markerTmp.setIcon(MarkerIcon['Whetblade'](marker.level))
                    this.MarkerTypes["Whetblade"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Incantation":
                    markerTmp.setIcon(MarkerIcon['Incantation'](marker.name))
                    this.MarkerTypes["Incantation"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Tailsman":
                    markerTmp.setIcon(MarkerIcon['Tailsman'](marker.name))
                    this.MarkerTypes["Tailsman"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "AshOfWar":
                    markerTmp.setIcon(MarkerIcon['AshOfWar'](marker.name))
                    this.MarkerTypes["AshOfWar"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "SpiritAsh":
                    markerTmp.setIcon(MarkerIcon['SpiritAsh'](marker.name))
                    this.MarkerTypes["SpiritAsh"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Armor":
                    markerTmp.setIcon(MarkerIcon['Armor'](marker.name))
                    this.MarkerTypes["Armor"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Warn":
                    markerTmp.setIcon(MarkerIcon['Warn'](marker.name))
                    this.MarkerTypes["Warn"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Taoke":
                    markerTmp.setIcon(MarkerIcon['Taoke'](marker.name))
                    this.MarkerTypes["Taoke"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "SmithingStone":
                    markerTmp.setIcon(MarkerIcon['SmithingStone'](marker.name,marker.level))
                    this.MarkerTypes["SmithingStone"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "SomberSmithingStone":
                    markerTmp.setIcon(MarkerIcon['SomberSmithingStone'](marker.level))
                    this.MarkerTypes["SomberSmithingStone"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Question":
                    markerTmp.setIcon(MarkerIcon['Question'](marker.name))
                    this.MarkerTypes["Question"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "MAP":
                    markerTmp.setIcon(MarkerIcon['MAP'](marker.name))
                    this.MarkerTypes["MAP"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "GravePickerBellBearing":
                    markerTmp.setIcon(MarkerIcon['GravePickerBellBearing'](marker.name))
                    this.MarkerTypes["GravePickerBellBearing"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "GhostPickerBellBearing":
                    markerTmp.setIcon(MarkerIcon['GhostPickerBellBearing'](marker.name))
                    this.MarkerTypes["GhostPickerBellBearing"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "BellBearing":
                    markerTmp.setIcon(MarkerIcon['BellBearing'](marker.name))
                    this.MarkerTypes["BellBearing"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "SmithingBellBearing":
                    markerTmp.setIcon(MarkerIcon['SmithingBellBearing'](marker.name))
                    this.MarkerTypes["SmithingBellBearing"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "SomberBellBearing":
                    markerTmp.setIcon(MarkerIcon['SomberBellBearing'](marker.name))
                    this.MarkerTypes["SomberBellBearing"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "GhostGlovewort":
                    markerTmp.setIcon(MarkerIcon['GhostGlovewort'](marker.level))
                    this.MarkerTypes["GhostGlovewort"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "GraveGlovewort":
                    markerTmp.setIcon(MarkerIcon['GraveGlovewort'](marker.level))
                    this.MarkerTypes["GraveGlovewort"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break
                default:
                    markerTmp.setIcon(MarkerIcon['Other'](marker.name))
                    this.MarkerTypes["Other"].push(markerTmp.bindPopup(customPopup,customOptions))
                    break;
            }
        })
        
        if(this.filterType!==[]){
            this.filterType.forEach(type=>{
                if (this.DOMShowTypes.includes(type)){
                    this.DomShowLayer.addLayer(this.MarkerTypes[type])
                }else{
                    this.CanvasShowLayer.addMarkers(this.MarkerTypes[type])
                }
                
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


        this.updateMarkers()
       
        /*
            Control Panel Setting Section [End]
        */

    //    this.showLayer.eachLayer(layer=>{
    //             layer.eachLayer(layer_child=>{
    //                 if (layer_child.marker_id!==5537){
    //                     layer_child._icon.style.display = 'none';
    //                 }
    // })})

    // var icon = L.icon({
    //     iconUrl: "https://eldenring.wiki.fextralife.com/file/Elden-Ring/map-d8dc59f2-67df-452e-a9ea-d2c00ddc3a2b/maps-icons/grace.png",
    //     iconSize: [20, 18],
    //     iconAnchor: [10, 9],

    //     text:'test',
    //     textAnchor: [5, 0],         
    //     textFont:'14px bold',       //设置字体大小和样式
    //     textFillStyle:'#FFFFFF'
    // });

    // var markers = [];
    // for (var i = 0; i < 10000; i++) {
    //     var marker = L.marker([58.5578 + Math.random()*20, 29.0087 + Math.random()*18], {icon: icon}).bindPopup("I Am "+i);
    //     markers.push(marker);
    // }
    // CanvasShowLayer.addMarkers(markers);
    // ciLayer.removeLayers()


    }

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