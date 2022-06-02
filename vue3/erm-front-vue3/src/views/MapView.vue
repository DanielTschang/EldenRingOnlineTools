

<template>
    <div id="map-container" >
        <map-side-bar @changeTypes="changeTypes" :initfilterType="filterType" :initMapLayer="maplayer" @ToggleMapChange="ToggleMapChange" />
        
        <div id="mymap">
        </div>
    </div>
</template>


<script>
import "leaflet/dist/leaflet-src";
import "@/plugins/leafletplugins";
// import "@/plugins/leafletplugins.js"
// import "leaflet-canvas-markers"
import { getCookie, setCookie } from '@/utils/Cookies';
import prefix from '@/utils/control-prefix'
import getMarkerByType from "@/utils/getMarker"
import MarkerIcon from "@/utils/markerIcon"
import MapSideBar from "@/components/sidebar/MapSideBar.vue"
import "@/css/leaflet.css"
import "@/css/customstyle.css"


/* eslint-disable */
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
                    this.showLayer.addLayer(this.MarkerTypes[type])
                })
            }
            if(deletedType.length>0){
                deletedType.forEach(type => {
                    this.showLayer.removeLayer(this.MarkerTypes[type])
                })
            }
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
                        else{
                            layer_child._icon.style.display = 'none';
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
            showLayer:L.layerGroup(),
            notshowLayer:L.layerGroup(),
            MarkerTypes: {
                "SiteOfGrace" : L.layerGroup(),
                "ShortPath" : L.layerGroup(),
                "Waygates" : L.layerGroup(),
                "RuneFarm" : L.layerGroup(),
                "Shop" : L.layerGroup(),
                "NPC" : L.layerGroup(),
                "Location" : L.layerGroup(),
                "SummoningPool" : L.layerGroup(),
                "Cave" : L.layerGroup(),
                "HorseTorrent" : L.layerGroup(),
                "WalkingMausoleum" : L.layerGroup(),
                "BigBoss" : L.layerGroup(),
                "Boss" : L.layerGroup(),
                "LittleBoss" : L.layerGroup(),
                "NPCInvaders" : L.layerGroup(),
                "GreatEnemy" : L.layerGroup(),
                "Item" : L.layerGroup(),
                "Cartacombs" : L.layerGroup(),
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
        var ciLayer = L.canvasIconLayer({}).addTo(this.MainMap);
        var icon = L.icon({
            iconUrl: "https://eldenring.wiki.fextralife.com/file/Elden-Ring/map-d8dc59f2-67df-452e-a9ea-d2c00ddc3a2b/maps-icons/grace.png",
            iconSize: [20, 18],
            iconAnchor: [10, 9]
        });

        var markers = [];
        for (var i = 0; i < 10000; i++) {
            console.log('aa')
            var marker = L.marker([58.5578 + Math.random()*1.8, 29.0087 + Math.random()*3.6], {icon: icon}).bindPopup("I Am "+i);
            markers.push(marker);
        }
        ciLayer.addLayers(markers);
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



        // let tmp = L.canvasMarker(L.latLng(-18.20324744134828, 80.1046120046544), {
        //     radius: 20,
        //     img: {
        //         url: "https://eldenring.wiki.fextralife.com/file/Elden-Ring/map-d8dc59f2-67df-452e-a9ea-d2c00ddc3a2b/maps-icons/grace.png",    //image link
        //         size: [40, 40],     //image size ( default [40, 40] )
        //         rotate: 10,         //image base rotate ( default 0 )
        //         offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
        //     },
        // }).addTo(this.MainMap)

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
                    markerTmp.setIcon(MarkerIcon['SiteOfGrace'])
                    this.MarkerTypes["SiteOfGrace"].addLayer(markerTmp.bindPopup(customPopup,customOptions));  
                    break;
                case "shortPath":
                    markerTmp.setIcon(MarkerIcon['ShortPath'])
                    this.MarkerTypes["ShortPath"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Waygates":
                    markerTmp.setIcon(MarkerIcon['Waygates'])
                    this.MarkerTypes["Waygates"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break    
                case "RuneFarm":
                    markerTmp.setIcon(MarkerIcon['RuneFarm'])
                    this.MarkerTypes["RuneFarm"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break  
                case "Shop":
                    markerTmp.setIcon(MarkerIcon['Shop'])
                    this.MarkerTypes["Shop"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "NPC":
                    markerTmp.setIcon(MarkerIcon["NPC"])
                    this.MarkerTypes["NPC"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Location":
                    // eslint-disable-next-line
                    markerTmp.setIcon(MarkerIcon["Location"](marker.level))         
                    this.MarkerTypes["Location"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "SummoningPool":
                    markerTmp.setIcon(MarkerIcon["SummoningPool"])
                    this.MarkerTypes["SummoningPool"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Cave":
                    markerTmp.setIcon(MarkerIcon['Cave'])
                    this.MarkerTypes["Cave"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "HorseTorrent":
                    markerTmp.setIcon(MarkerIcon['HorseTorrent'])
                    this.MarkerTypes["HorseTorrent"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "WalkingMausoleum":
                    markerTmp.setIcon(MarkerIcon['WalkingMausoleum'])
                    this.MarkerTypes["WalkingMausoleum"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "BigBoss":
                    markerTmp.setIcon(MarkerIcon['BigBoss'](marker.level))
                    this.MarkerTypes["BigBoss"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Boss":
                    markerTmp.setIcon(MarkerIcon['Boss'])
                    this.MarkerTypes["Boss"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "LittleBoss":
                    markerTmp.setIcon(MarkerIcon['LittleBoss'])
                    this.MarkerTypes["LittleBoss"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "NPCInvaders":
                    markerTmp.setIcon(MarkerIcon['NPCInvaders'])
                    this.MarkerTypes["NPCInvaders"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "GreatEnemy":
                    markerTmp.setIcon(MarkerIcon['GreatEnemy'])
                    this.MarkerTypes["GreatEnemy"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Item":
                    markerTmp.setIcon(MarkerIcon['Item'])
                    this.MarkerTypes["Item"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Cartacombs":
                    markerTmp.setIcon(MarkerIcon['Cartacombs'])
                    this.MarkerTypes["Cartacombs"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "Evergaol":
                    markerTmp.setIcon(MarkerIcon['Evergaol'])
                    this.MarkerTypes["Evergaol"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "GoldenSeed":
                    markerTmp.setIcon(MarkerIcon['GoldenSeed'])
                    this.MarkerTypes["GoldenSeed"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "CrystalTears":
                    markerTmp.setIcon(MarkerIcon['CrystalTears'])
                    this.MarkerTypes["CrystalTears"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "KeyItems":
                    markerTmp.setIcon(MarkerIcon['KeyItems'])
                    this.MarkerTypes["KeyItems"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "StoneSwordKey":
                    markerTmp.setIcon(MarkerIcon['StoneSwordKey'](marker.level))
                    this.MarkerTypes["StoneSwordKey"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "DeathRoot":
                    markerTmp.setIcon(MarkerIcon['DeathRoot'])
                    this.MarkerTypes["DeathRoot"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "DragonHeart":
                    markerTmp.setIcon(MarkerIcon['DragonHeart'])
                    this.MarkerTypes["DragonHeart"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    
                    break
                case "LarvalTear":
                    markerTmp.setIcon(MarkerIcon['LarvalTear'])
                    this.MarkerTypes["LarvalTear"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "SacredTear":
                    markerTmp.setIcon(MarkerIcon['SacredTear'])
                    this.MarkerTypes["SacredTear"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Painting":
                    markerTmp.setIcon(MarkerIcon['Painting'])
                    this.MarkerTypes["Painting"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Gesture":
                    markerTmp.setIcon(MarkerIcon['Gesture'])
                    this.MarkerTypes["Gesture"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Material":
                    markerTmp.setIcon(MarkerIcon['Material'])
                    this.MarkerTypes["Material"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Sorceries":
                    markerTmp.setIcon(MarkerIcon['Sorceries'])
                    this.MarkerTypes["Sorceries"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Weapon":
                    markerTmp.setIcon(MarkerIcon['Weapon'])
                    this.MarkerTypes["Weapon"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Cookbook":
                    markerTmp.setIcon(MarkerIcon['Cookbook'])
                    this.MarkerTypes["Cookbook"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Whetblade":
                    markerTmp.setIcon(MarkerIcon['Whetblade'](marker.level))
                    this.MarkerTypes["Whetblade"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Incantation":
                    markerTmp.setIcon(MarkerIcon['Incantation'])
                    this.MarkerTypes["Incantation"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Tailsman":
                    markerTmp.setIcon(MarkerIcon['Tailsman'])
                    this.MarkerTypes["Tailsman"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "AshOfWar":
                    markerTmp.setIcon(MarkerIcon['AshOfWar'])
                    this.MarkerTypes["AshOfWar"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "SpiritAsh":
                    markerTmp.setIcon(MarkerIcon['SpiritAsh'])
                    this.MarkerTypes["SpiritAsh"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Armor":
                    markerTmp.setIcon(MarkerIcon['Armor'])
                    this.MarkerTypes["Armor"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Warn":
                    markerTmp.setIcon(MarkerIcon['Warn'])
                    this.MarkerTypes["Warn"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Taoke":
                    markerTmp.setIcon(MarkerIcon['Taoke'])
                    this.MarkerTypes["Taoke"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "SmithingStone":
                    markerTmp.setIcon(MarkerIcon['SmithingStone'](marker.level))
                    this.MarkerTypes["SmithingStone"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "SomberSmithingStone":
                    markerTmp.setIcon(MarkerIcon['SomberSmithingStone'](marker.level))
                    this.MarkerTypes["SomberSmithingStone"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "Question":
                    markerTmp.setIcon(MarkerIcon['Question'])
                    this.MarkerTypes["Question"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "MAP":
                    markerTmp.setIcon(MarkerIcon['MAP'])
                    this.MarkerTypes["MAP"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "GravePickerBellBearing":
                    markerTmp.setIcon(MarkerIcon['GravePickerBellBearing'])
                    this.MarkerTypes["GravePickerBellBearing"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "GhostPickerBellBearing":
                    markerTmp.setIcon(MarkerIcon['GhostPickerBellBearing'])
                    this.MarkerTypes["GhostPickerBellBearing"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "BellBearing":
                    markerTmp.setIcon(MarkerIcon['BellBearing'])
                    this.MarkerTypes["BellBearing"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "SmithingBellBearing":
                    markerTmp.setIcon(MarkerIcon['SmithingBellBearing'])
                    this.MarkerTypes["SmithingBellBearing"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break
                case "SomberBellBearing":
                    markerTmp.setIcon(MarkerIcon['SomberBellBearing'])
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
                    markerTmp.setIcon(MarkerIcon['Other'])
                    this.MarkerTypes["Other"].addLayer(markerTmp.bindPopup(customPopup,customOptions))
                    break;
            }
        })

        if(this.filterType!==[]){
            this.filterType.forEach(type=>{
                
                this.showLayer.addLayer(this.MarkerTypes[type])
            })
            this.showLayer.addTo(this.MainMap)
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