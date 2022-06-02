<template>
    
        <div class="sidebar" :style="{width:sidebarWidth}">
            
                <span
                    class="collapse-icon"
                    :class="{'rotate-180':!collapsed}"
                    @click="toggleSidebar"
                >
                    <i class="fa fa-angle-double-left"></i>
                </span>
                
                <div  v-if="collapsed" class="sidebar-content-container">
                    <transition-group name="checkbox" appear>
                        <div :key="'controller-container'" class="controller-container">
                            <div :key="'controller-content'" class="controller-content">
                                <input style="display:none;;" type="checkbox" :id="'maplayer'" :true-value="0" :false-value="1" v-model="maplayer" @change="toggleChangeMap()">
                                <label :for="'maplayer'" style="cursor:pointer">
                                    <p v-if="maplayer==0">切換地底地圖</p>
                                    <p v-else>切換地表地圖</p>
                                </label>
                            </div>
                            <div :key="'controller-content'" class="controller-content">
                                <button @click="toggleAllNotChecked()">只顯示地標</button>
                            </div>

                        </div>
                        <div :key="'position'" class="position-container">
                            <div class="switch-container">
                                <span>顯示已蒐集</span>
                                <Toggle :key="'ground'" v-model="showAchieved" onLabel="On" offLabel="Off"/>
                                
                            </div>
                            <div class="switch-container">
                                <span>顯示灰城</span>
                                <Toggle :key="'show'" v-model="showEndGame" onLabel="On" offLabel="Off"/>
                                
                            </div>
                        </div>
                        
                        <div :key="'checkbox-container'" class="checkbox-container">
                            
                            <div :key="'location'">
                                <button class="checkbox-button" @click="toggleCheckType('Locations')">
                                    <p>—————地點—————</p>
                                </button>
                            </div>
                            <div class="checkbox-content">
                                <div class="checkbox-item" :key="type.id" v-for="type in Locations">    
                                    <input type="checkbox" :id="type.zhname" :value="type.enname" v-model="filterType" @change="changeTypes()">
                                    <label :for="type.zhname">{{ type.zhname }}</label>
                                </div>
                            </div>

                            
                            <div :key="'items'">
                                <button class="checkbox-button" @click="toggleCheckType('Items')">
                                    <p>—————物品—————</p>
                                </button>
                            </div>
                            <div class="checkbox-content">
                                <div class="checkbox-item" :key="type.id" v-for="type in Items">    
                                    <input type="checkbox" :id="type.zhname" :value="type.enname" v-model="filterType" @change="changeTypes()">
                                    <label :for="type.zhname">{{ type.zhname }}</label>
                                </div>

                            </div>

                            <div :key="'upgrades'">
                                <button class="checkbox-button" @click="toggleCheckType('Upgrades')">
                                    <p>—————升級—————</p>
                                </button>
                            </div>
                            <div class="checkbox-content">
                                <div class="checkbox-item" :key="type.id" v-for="type in Upgrades">    
                                    <input type="checkbox" :id="type.zhname" :value="type.enname" v-model="filterType" @change="changeTypes()">
                                    <label :for="type.zhname">{{ type.zhname }}</label>
                                </div>

                            </div>

                            

                                <div :key="'enemy'">
                                    <button class="checkbox-button" @click="toggleCheckType('Enemy')">
                                        <p>—————敵人—————</p>
                                    </button>
                                </div>
                            <div class="checkbox-content">
                                <div class="checkbox-item" :key="type.id" v-for="type in Enemy">    
                                    <input type="checkbox" :id="type.zhname" :value="type.enname" v-model="filterType" @change="changeTypes()">
                                    <label :for="type.zhname">{{ type.zhname }}</label>
                                </div>
                            </div>
                            


                            <div :key="'equipment'">
                                <button class="checkbox-button" @click="toggleCheckType('Equipments')">
                                    <p>—————裝備—————</p>
                                </button>
                                </div>
                            <div class="checkbox-content">
                                <div class="checkbox-item" :key="type.id" v-for="type in Equipments">    
                                    <input type="checkbox" :id="type.zhname" :value="type.enname" v-model="filterType" @change="changeTypes()">
                                    <label :for="type.zhname">{{ type.zhname }}</label>
                                </div>
                            
                            </div>
                        



                            
                            <div :key="'other'">
                                <button class="checkbox-button" @click="toggleCheckType('Other')">
                                    <p>—————其他—————</p>
                                </button>

                            </div>
                            <div class="checkbox-content">
                                <div class="checkbox-item" :key="type.id" v-for="type in Other">    
                                    <input type="checkbox" :id="type.zhname" :value="type.enname" v-model="filterType" @change="changeTypes()">
                                    <label :for="type.zhname">{{ type.zhname }}</label>
                                </div>
                            </div>
                            
                        </div>
                </transition-group> 
                </div>
                 
           
            
    </div>
  
</template>

<script>
// import {collapsed, toggleSidebar ,sidebarWidth } from "@/utils/SidebarState";
// import MapSideBarCheckbox from '@/components/sidebar/MapSideBarCheckbox.vue';
import { Locations, Enemy, Items, Equipments, Other, Upgrades} from "@/utils/markerType"
import { setCookie, getCookie } from '@/utils/Cookies'
import Toggle from '@vueform/toggle'
import "@/css/toggle.css"

export default {  
    props:{
        initfilterType:Array,
        initMapLayer:Number
    },
    components:{
        Toggle
    },

    data(){
        return{
            maplayer:0,
            filterType:[],
            showEndGame:true,
            showAchieved:true,
            collapsed:null,
            collapedWidth:30,
            openWidth:300,
            MobileopenWidth:'100%',
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
        }
    },
    setup(){
        return { Locations, Enemy, Items, Equipments, Other, Upgrades}
    },
    created(){
        this.filterType = this.initfilterType
        this.maplayer = this.initMapLayer
        // this.$emit("changeTypes",this.filterType)
        let sidebarToggled = getCookie('sidebar');
        this.collapsed = sidebarToggled == "false" ? false : true;
    },
    methods:{
        toggleSidebar(){
            this.collapsed = !this.collapsed
            setCookie('sidebar',this.collapsed)
        },
        changeTypes(){
            setCookie("filterType", this.filterType)
            this.$emit("changeTypes",this.filterType)
        },
        onResize(){
            this.windowHeight = window.innerHeight;
            this.windowWidth = window.innerWidth;
        },
        toggleChangeMap(){
            setCookie("maplayer",this.maplayer)
            this.$emit('ToggleMapChange',this.maplayer)
        },
        toggleAllNotChecked(){
            this.filterType = ["Location"]
            this.changeTypes();
        },
        toggleCheckType(type){
            this.CheckType(type)
            this.changeTypes()
        },
        CheckType(type){
            let tmpArray = Array.from(this.filterType)
            let num = 0
            switch(type){
                case("Locations"):
                    Locations.forEach(locate => {
                        if (tmpArray.indexOf(locate.enname) === -1){
                            num+=1
                            tmpArray = [...tmpArray, locate.enname]
                        }
                    })
                    if (num ===0){
                        Locations.forEach(locate=>{
                            tmpArray = tmpArray.filter(e=> e !== locate.enname)
                        })
                    }
                    this.filterType = tmpArray;
                    break;
                case("Enemy"):
                    Enemy.forEach(locate => {
                        if (tmpArray.indexOf(locate.enname) === -1){
                            num+=1
                            tmpArray = [...tmpArray, locate.enname]
                        }
                    })
                    if (num ===0){
                        Enemy.forEach(locate=>{
                            tmpArray = tmpArray.filter(e=> e !== locate.enname)
                        })
                    }
                    this.filterType = tmpArray;
                    break;
                case("Items"):
                    Items.forEach(locate => {
                        if (tmpArray.indexOf(locate.enname) === -1){
                            num+=1
                            tmpArray = [...tmpArray, locate.enname]
                        }
                    })
                    if (num ===0){
                        Items.forEach(locate=>{
                            tmpArray = tmpArray.filter(e=> e !== locate.enname)
                        })
                    }
                    this.filterType = tmpArray;
                    break;
                case("Equipments"):
                    Equipments.forEach(locate => {
                        if (tmpArray.indexOf(locate.enname) === -1){
                            num+=1
                            tmpArray = [...tmpArray, locate.enname]
                        }
                    })
                    if (num ===0){
                        Equipments.forEach(locate=>{
                            tmpArray = tmpArray.filter(e=> e !== locate.enname)
                        })
                    }
                    this.filterType = tmpArray;
                    break;
                case("Other"):
                    Other.forEach(locate => {
                        if (tmpArray.indexOf(locate.enname) === -1){
                            num+=1
                            tmpArray = [...tmpArray, locate.enname]
                        }
                    })
                    if (num ===0){
                        Other.forEach(locate=>{
                            tmpArray = tmpArray.filter(e=> e !== locate.enname)
                        })
                    }
                    this.filterType = tmpArray;
                    break;
                case("Upgrades"):
                    Upgrades.forEach(locate => {
                        if (tmpArray.indexOf(locate.enname) === -1){
                            num+=1
                            tmpArray = [...tmpArray, locate.enname]
                        }
                    })
                    if (num ===0){
                        Upgrades.forEach(locate=>{
                            tmpArray = tmpArray.filter(e=> e !== locate.enname)
                        })
                    }
                    this.filterType = tmpArray;
                    break;
            }
        }

            
            

        
    },
    computed:{
        sidebarWidth(){
            if (!this.collapsed){
                return `${this.collapedWidth}px`
            }else{
                return this.windowWidth>750 ? `${this.openWidth}px` : `100%`
            }
            // return `${this.collapsed ? this.openWidth : this.collapedWidth}px`
        }
    },
    mounted(){
        this.$nextTick(()=>{
            window.addEventListener('resize', this.onResize)
        })
    },
}
  
</script>


<style scoped>
    *{
        color:rgb(219, 200, 165) ;
    }
    .sidebar {
        color:white;
        background-color:rgba(0, 0, 0, 0.7);

        float:right;
        position:fixed;
        z-index:10000;
        left:0;
        bottom:0;
        top:3.5%;

        height: 88vh;
        /* border-end-end-radius: 20px; */
        border-image: url("@/assets/borderImage.png");
        border-image-repeat:round;
        border-image-slice:30 50 fill;
        border-image-width:25px 40px;
        transition: 0.2s ease;
        padding:5px;
        

        display: flex;
        flex-direction: column;
        min-height: max-content;

    }

 .rotate-180{
     transition: 0.3s linear;
 }
    .controller-container{
        display:flex;
        flex-direction: row;
        justify-content: center;
        justify-items: center;
        align-items: center;
        
        padding:3px 10px;
        margin:0px 5px;
    }
    .controller-container button{
        cursor: inherit;
    }
    .controller-container > :nth-child(1){
        border: solid 3px rgb(171, 150, 111) ;
    }
    .controller-container > :nth-child(2){
        border: solid 3px rgb(171, 150, 111) ;
        border-left: none;
    }
    .controller-content{
        display: flex;
        width: 100%;
        align-self: center;
        justify-content: center;
        padding:5px;
        
        box-sizing: content-box;
    }
    .controller-content:hover{
        box-shadow: 0px 0px 10px 1px rgb(171, 150, 111);
    }
    .checkbox-container input[type="checkbox"]{
        appearance: none;
        -webkit-appearance:none; 
        height: 12px;
        width: 12px;
        background-color: #d5d5d5;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .checkbox-container label{
        color:#c7c7c7;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
    }
    .checkbox-container input[type="checkbox"]:after{
        content:"\f00c";
        font-family: "Font Awesome 5 Free";
        font-weight: 700;
        font-size:2px;
        display: none;
        color:black;
    }
    .checkbox-container input[type="checkbox"]:hover{
        background-color:#868585;
    }

    .checkbox-container input[type="checkbox"]:checked:after{
        display:block;
    }
    .checkbox-enter-active{
        transition: opacity 1.2s 
    }
    .checkbox-leave-active{
        transition: opacity 0.2s;
    }
    .checkbox-enter-from,
    .checkbox-leave-to{
        opacity: 0;
    }

    .position-container{
        display: flex;
        flex-direction: row;
        width:100%;

        margin:0 auto;
        text-align: center;
        color:white;
    }
    .position-container *{
        margin:2px;
    }
    .switch-container {
        display: flex;
        flex-direction: row;
    }


    .collapse-icon{
        padding-top:8px;
    }



.sidebar-content-container{
    display: flex;
    flex-direction: column;

    min-height: max-content;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    overflow: scroll;
    padding:5px;
}
.sidebar-content-container::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
}
 .checkbox-container{
    /* transition: 0s linear; */
    display:flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-bottom: 5px;
    margin-bottom:15px;
 }

 .checkbox-content{
    padding:5px;
 }

 .checkbox-item{
    display:flex;
    float:left;
    max-width: 100%;
    width:80px;
    margin:0.1px 1.5px;
    justify-content: flex-start;
    align-items:flex-start;
 }
 .checkbox-item input{
     margin-right:3px
 }
 .checkbox-item label{
     font-size: 10px;
 }
 
 .checkbox-button p:hover{
     text-shadow: 0px 0px 5px rgb(214, 172, 94);
 }


/* @media screen and (max-width: 800px){
    .sidebar{
        min-width: 100%;
        
    }
} */

</style>
