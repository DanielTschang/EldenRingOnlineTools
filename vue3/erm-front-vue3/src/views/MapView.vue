

<template>
    <div id="map-container" >
        <MapSideBar @changeTypes="changeTypes" :initfilterType="filterType" :initShowText="showText" :initFontSize="fontSize" :initMapLayer="maplayer" @ToggleMapChange="ToggleMapChange" @ToggleShowTextChange="ToggleShowTextChange" @ToggleFontSizeChange="ToggleFontSizeChange" />
        <LoadingCircle v-if="!markersLoaded"/>
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
import LoadingCircle from "@/components/LoadingCircle.vue"


export default {

    components:{
        MapSideBar,
        LoadingCircle
    },
    
    methods:{
        destroyed() {
            console.warn('[component About] destroyed', this.user)
        },
        activated() {
            console.warn('[component About] activated', this.user)
        },
        deactivated() {
            console.warn('[component About] deactivated', this.user)
        },
        changeTypes(checkedType){
            let deletedType = this.filterType.filter(type => !checkedType.includes(type));
            let addType = checkedType.filter(type=>!this.filterType.includes(type))
            this.filterType = checkedType
            
            if(addType.length>0){
                addType.forEach(type => {
                    if (this.DOMShowTypes.includes(type)){
                        this.DomShowLayer.addLayer(this.MarkerTypes[type])
                    }else{
                        this.CanvasShowProxy.addLayer(this.MarkerTypes[type])
                    }
                })
            }
            if(deletedType.length>0){
                deletedType.forEach(type => {
                    if (this.DOMShowTypes.includes(type)){
                        this.DomShowLayer.removeLayer(this.MarkerTypes[type])
                    }else{
                        this.CanvasShowProxy.removeLayer(this.MarkerTypes[type])
                    }
                })
            }
            
            this.updateMarkers()
            this._redraw()
        },
        ToggleshowCollected(show){
            // TODO : 等會員用好再完成
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
            this.showEndGame = show;
            // if(this.showEndGame!==show){
            //     if(show){
            //         this.DomShowLayer.eachLayer(layer=>{
            //             layer.eachLayer(layer_child=>{
            //                 if(layer_child.position=2){
            //                     layer_child._icon.style.display = '';
            //                 }
            //             })
            //         })
            //         this.filterType.forEach()
            //         this.MarkerTypes[type].forEach(eachMarker=>{
            //             this.CanvasShowLayer.removeMarker(eachMarker)
            //         })
            //     }else{

            //     }
            // }

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
            this.DomShowLayer.eachLayer(layer=>{
                layer.eachLayer(marker=>{
                    if(marker.is_underground==this.maplayer){
                        marker._icon.style.display = '';
                    }
                    else{
                        marker._icon.style.display = 'none';
                    }
                })
            })
            this.CanvasShowLayer.clearLayers()
            this.CanvasShowProxy.eachLayer(layer=>{
                layer.eachLayer(marker=>{
                    if(marker.is_underground==this.maplayer){
                        this.CanvasShowLayer.addMarker(marker)
                    }
                })
            })



        },
        ToggleShowTextChange(showtext){
            this.showText = showtext
            this._redraw()
        },
        ToggleFontSizeChange(fontsize){
            this.fontSize = fontsize
            console.log(fontsize)
            this._redraw()
        },
        _redraw(){
            this.CanvasShowLayer.setShowText(this.showText)
            this.CanvasShowLayer.setFontSize(this.fontSize)
            this.CanvasShowLayer.redraw()
        }
    },
    data(){
        return {
            GameVersion: "1.04",
            MainMap:null,
            groundLayer:true,
            zoom:4,
            markers:[],
            markersLoaded:false,
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
            fontSize:10,
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
            CanvasShowProxy:L.layerGroup(),
            MarkerTypes: {
                "Location" : L.layerGroup(),
                "BigBoss" : L.layerGroup(),
                "SiteOfGrace" : L.layerGroup(),
                "ShortPath" : L.layerGroup(),
                "Waygates" : L.layerGroup(),
                "RuneFarm" : L.layerGroup(),
                "Shop" : L.layerGroup(),
                "NPC" : L.layerGroup(),
                "SummoningPool" : L.layerGroup(),
                "Cave" : L.layerGroup(),
                "HorseTorrent" : L.layerGroup(),
                "WalkingMausoleum" : L.layerGroup(),
                "Boss" : L.layerGroup(),
                "LittleBoss" : L.layerGroup(),
                "NPCInvaders" : L.layerGroup(),
                "GreatEnemy" : L.layerGroup(),
                "Item" : L.layerGroup(),
                "Catacombs" : L.layerGroup(),
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
        let mapLayerCookie = getCookie('maplayer');
        let fontSizeCookie = getCookie('fontsize');
        let showTextCookie = getCookie('showtext');


        this.zoom = zoomCookie == "" ? this.zoom : zoomCookie ;
        this.initCenterLat = latCookie == "" ? this.initCenterLat : latCookie;
        this.initCenterLng = lngCookie == "" ? this.initCenterLng : lngCookie;
        this.filterType = TypeCookie == "" ? ["Location"] : TypeCookie.split(",")
        this.maplayer = mapLayerCookie == "" ? 0 : Number(mapLayerCookie);
        this.fontSize = fontSizeCookie == "" ? 12 : Number(fontSizeCookie);
        this.showText = showTextCookie == "true" ? true : false



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
        this.markersLoaded = true;
        
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
                    this.MarkerTypes["SiteOfGrace"].addLayer(markerTmp.bindPopup(customPopup,customOptions));  
                    break;
                case "shortPath":
                    markerTmp.setIcon(MarkerIcon['ShortPath'](marker.name))
                    this.MarkerTypes["ShortPath"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Waygates":
                    markerTmp.setIcon(MarkerIcon['Waygates'](marker.name))
                    this.MarkerTypes["Waygates"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break    
                case "RuneFarm":
                    markerTmp.setIcon(MarkerIcon['RuneFarm'](marker.name))
                    this.MarkerTypes["RuneFarm"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break  
                case "Shop":
                    markerTmp.setIcon(MarkerIcon['Shop'](marker.name))
                    this.MarkerTypes["Shop"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "NPC":
                    markerTmp.setIcon(MarkerIcon["NPC"](marker.name))
                    this.MarkerTypes["NPC"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Location":
                    // eslint-disable-next-line
                    markerTmp.setIcon(MarkerIcon["Location"](marker.name,marker.level))
                    this.MarkerTypes["Location"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "SummoningPool":
                    markerTmp.setIcon(MarkerIcon["SummoningPool"](marker.name))
                    this.MarkerTypes["SummoningPool"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Cave":
                    markerTmp.setIcon(MarkerIcon['Cave'](marker.name))
                    this.MarkerTypes["Cave"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "HorseTorrent":
                    markerTmp.setIcon(MarkerIcon['HorseTorrent'](marker.name))
                    this.MarkerTypes["HorseTorrent"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "WalkingMausoleum":
                    markerTmp.setIcon(MarkerIcon['WalkingMausoleum'](marker.name))
                    this.MarkerTypes["WalkingMausoleum"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "BigBoss":
                    markerTmp.setIcon(MarkerIcon['BigBoss'](marker.level))
                    this.MarkerTypes["BigBoss"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Boss":
                    markerTmp.setIcon(MarkerIcon['Boss'](marker.name))
                    this.MarkerTypes["Boss"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "LittleBoss":
                    markerTmp.setIcon(MarkerIcon['LittleBoss'](marker.name))
                    this.MarkerTypes["LittleBoss"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "NPCInvaders":
                    markerTmp.setIcon(MarkerIcon['NPCInvaders'](marker.name))
                    this.MarkerTypes["NPCInvaders"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "GreatEnemy":
                    markerTmp.setIcon(MarkerIcon['GreatEnemy'](marker.name))
                    this.MarkerTypes["GreatEnemy"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Item":
                    markerTmp.setIcon(MarkerIcon['Item'](marker.name))
                    this.MarkerTypes["Item"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Catacombs":
                    markerTmp.setIcon(MarkerIcon['Catacombs'](marker.level,marker.name))
                    this.MarkerTypes["Catacombs"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Evergaol":
                    markerTmp.setIcon(MarkerIcon['Evergaol'](marker.name))
                    this.MarkerTypes["Evergaol"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "GoldenSeed":
                    markerTmp.setIcon(MarkerIcon['GoldenSeed'](marker.name))
                    this.MarkerTypes["GoldenSeed"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "CrystalTears":
                    markerTmp.setIcon(MarkerIcon['CrystalTears'](marker.name))
                    this.MarkerTypes["CrystalTears"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "KeyItems":
                    markerTmp.setIcon(MarkerIcon['KeyItems'](marker.name))
                    this.MarkerTypes["KeyItems"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "StoneSwordKey":
                    markerTmp.setIcon(MarkerIcon['StoneSwordKey'](marker.level))
                    this.MarkerTypes["StoneSwordKey"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "DeathRoot":
                    markerTmp.setIcon(MarkerIcon['DeathRoot'](marker.name))
                    this.MarkerTypes["DeathRoot"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "DragonHeart":
                    markerTmp.setIcon(MarkerIcon['DragonHeart'](marker.name))
                    this.MarkerTypes["DragonHeart"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "LarvalTear":
                    markerTmp.setIcon(MarkerIcon['LarvalTear'](marker.name))
                    this.MarkerTypes["LarvalTear"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "SacredTear":
                    markerTmp.setIcon(MarkerIcon['SacredTear'](marker.name))
                    this.MarkerTypes["SacredTear"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Painting":
                    markerTmp.setIcon(MarkerIcon['Painting'](marker.name))
                    this.MarkerTypes["Painting"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Gesture":
                    markerTmp.setIcon(MarkerIcon['Gesture'](marker.name))
                    this.MarkerTypes["Gesture"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Material":
                    markerTmp.setIcon(MarkerIcon['Material'](marker.name))
                    this.MarkerTypes["Material"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Sorceries":
                    markerTmp.setIcon(MarkerIcon['Sorceries'](marker.name))
                    this.MarkerTypes["Sorceries"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Weapon":
                    markerTmp.setIcon(MarkerIcon['Weapon'](marker.name))
                    this.MarkerTypes["Weapon"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Cookbook":
                    markerTmp.setIcon(MarkerIcon['Cookbook'](marker.name))
                    this.MarkerTypes["Cookbook"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Whetblade":
                    markerTmp.setIcon(MarkerIcon['Whetblade'](marker.level))
                    this.MarkerTypes["Whetblade"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Incantation":
                    markerTmp.setIcon(MarkerIcon['Incantation'](marker.name))
                    this.MarkerTypes["Incantation"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Tailsman":
                    markerTmp.setIcon(MarkerIcon['Tailsman'](marker.name))
                    this.MarkerTypes["Tailsman"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "AshOfWar":
                    markerTmp.setIcon(MarkerIcon['AshOfWar'](marker.name))
                    this.MarkerTypes["AshOfWar"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "SpiritAsh":
                    markerTmp.setIcon(MarkerIcon['SpiritAsh'](marker.name))
                    this.MarkerTypes["SpiritAsh"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Armor":
                    markerTmp.setIcon(MarkerIcon['Armor'](marker.name))
                    this.MarkerTypes["Armor"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Warn":
                    markerTmp.setIcon(MarkerIcon['Warn'](marker.name))
                    this.MarkerTypes["Warn"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Taoke":
                    markerTmp.setIcon(MarkerIcon['Taoke'](marker.name))
                    this.MarkerTypes["Taoke"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "SmithingStone":
                    markerTmp.setIcon(MarkerIcon['SmithingStone'](marker.name,marker.level))
                    this.MarkerTypes["SmithingStone"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "SomberSmithingStone":
                    markerTmp.setIcon(MarkerIcon['SomberSmithingStone'](marker.name,marker.level))
                    this.MarkerTypes["SomberSmithingStone"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Question":
                    markerTmp.setIcon(MarkerIcon['Question'](marker.name))
                    this.MarkerTypes["Question"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "MAP":
                    markerTmp.setIcon(MarkerIcon['MAP'](marker.name))
                    this.MarkerTypes["MAP"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "GravePickerBellBearing":
                    markerTmp.setIcon(MarkerIcon['GravePickerBellBearing'](marker.name))
                    this.MarkerTypes["GravePickerBellBearing"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "GhostPickerBellBearing":
                    markerTmp.setIcon(MarkerIcon['GhostPickerBellBearing'](marker.name))
                    this.MarkerTypes["GhostPickerBellBearing"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "BellBearing":
                    markerTmp.setIcon(MarkerIcon['BellBearing'](marker.name))
                    this.MarkerTypes["BellBearing"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "SmithingBellBearing":
                    markerTmp.setIcon(MarkerIcon['SmithingBellBearing'](marker.name))
                    this.MarkerTypes["SmithingBellBearing"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "SomberBellBearing":
                    markerTmp.setIcon(MarkerIcon['SomberBellBearing'](marker.name))
                    this.MarkerTypes["SomberBellBearing"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "GhostGlovewort":
                    markerTmp.setIcon(MarkerIcon['GhostGlovewort'](marker.level))
                    this.MarkerTypes["GhostGlovewort"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "GraveGlovewort":
                    markerTmp.setIcon(MarkerIcon['GraveGlovewort'](marker.level))
                    this.MarkerTypes["GraveGlovewort"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                default:
                    markerTmp.setIcon(MarkerIcon['Other'](marker.name))
                    this.MarkerTypes["Other"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break;
            }
        })
        this.CanvasShowLayer.setShowText(this.showText)
        this.CanvasShowLayer.setFontSize(this.fontSize)
        if(this.filterType!==[]){
            this.filterType.forEach(type=>{
                if (this.DOMShowTypes.includes(type)){
                    this.DomShowLayer.addLayer(this.MarkerTypes[type])
                }else{
                    this.CanvasShowProxy.addLayer(this.MarkerTypes[type])

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
    //     markers.addLayer(marker);
    // }
    // CanvasShowLayer.addMarkers(markers);
    // ciLayer.removeLayers()


    }

}
</script>

<style scoped>
    .Log{
        z-index: 9999999;
    }
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
        background:#222222;
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