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
                    <div :key="'position'" class="position-container">
                        <input type="checkbox" :id="'maplayer'" :true-value="0" :false-value="1" v-model="maplayer" @change="toggleChangeMap()">
                        <label :for="'maplayer'">切換地圖</label>
                    </div>
                    <div :key="'position'" class="position-container">
                        <div class="switch-container">
                            <h3>顯示已完成</h3>
                            <Toggle :key="'ground'" v-model="GroundorNot" onLabel="On" offLabel="Off"/>
                            
                        </div>
                        <div class="switch-container">
                            <h3>顯示灰城</h3>
                            <Toggle :key="'show'" v-model="showAchieved" onLabel="On" offLabel="Off"/>
                            
                        </div>
                    </div>
                    
                    <div :key="'checkbox-container'" class="checkbox-container">
                        
                        <div :key="'location'">
                            <h>-地點-</h>
                        </div>
                        <div class="checkbox-content">
                            <div class="checkbox-item" :key="type.id" v-for="type in Locations">    
                                <input type="checkbox" :id="type.zhname" :value="type.enname" v-model="filterType" @change="changeTypes()">
                                <label :for="type.zhname">{{ type.zhname }}</label>
                            </div>
                        </div>

                        
                        <div :key="'items'">
                            <h>-物品-</h>
                        </div>
                        <div class="checkbox-content">
                            <div class="checkbox-item" :key="type.id" v-for="type in Items">    
                                <input type="checkbox" :id="type.zhname" :value="type.enname" v-model="filterType" @change="changeTypes()">
                                <label :for="type.zhname">{{ type.zhname }}</label>
                            </div>

                        </div>

                        <div :key="'upgrades'">
                            <h>-升級品-</h>
                        </div>
                        <div class="checkbox-content">
                            <div class="checkbox-item" :key="type.id" v-for="type in Upgrades">    
                                <input type="checkbox" :id="type.zhname" :value="type.enname" v-model="filterType" @change="changeTypes()">
                                <label :for="type.zhname">{{ type.zhname }}</label>
                            </div>

                        </div>

                        

                            <div :key="'enemy'">
                                <h>-敵人-</h>
                            </div>
                        <div class="checkbox-content">
                            <div class="checkbox-item" :key="type.id" v-for="type in Enemy">    
                                <input type="checkbox" :id="type.zhname" :value="type.enname" v-model="filterType" @change="changeTypes()">
                                <label :for="type.zhname">{{ type.zhname }}</label>
                            </div>
                        </div>
                        


                        <div :key="'equipment'">
                            <h>-裝備-</h>
                        </div>
                        <div class="checkbox-content">
                            <div class="checkbox-item" :key="type.id" v-for="type in Equipments">    
                                <input type="checkbox" :id="type.zhname" :value="type.enname" v-model="filterType" @change="changeTypes()">
                                <label :for="type.zhname">{{ type.zhname }}</label>
                            </div>
                        
                        </div>
                    



                        
                        <div :key="'other'">
                            <h>-其他-</h>
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
    name:"MapSideBar",
    props:{
        initfilterType:Array
    },
    components:{
        Toggle
    },

    data(){
        return{
            maplayer:0,
            filterType:[],
            GroundorNot:true,
            showAchieved:true,
            collapsed:null,
            collapedWidth:30,
            openWidth:300,
            MobileopenWidth:'100%',
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            AllCheckedArr:[],
        }
    },
    setup(){
        return { Locations, Enemy, Items, Equipments, Other, Upgrades}
    },
    created(){
        this.filterType = this.initfilterType
        // this.$emit("changeTypes",this.filterType)
        let sidebarToggled = getCookie('sidebar');
        this.collapsed = sidebarToggled == "false" ? false : true;

        let eachType = [Locations, Enemy, Items, Equipments, Other, Upgrades]

        eachType.forEach(type=>{
            type.forEach(locate=>{
                this.AllCheckedArr.push(locate.enname)
            })
        })
    },
    methods:{
        toggleSidebar(){
            this.collapsed = !this.collapsed
            setCookie('sidebar',this.collapsed)
        },
        changeTypes(){
            this.$emit("changeTypes",this.filterType)
        },
        onResize(){
            this.windowHeight = window.innerHeight;
            this.windowWidth = window.innerWidth;
        },
        toggleChangeMap(){
            this.$emit('ToggleMapChange',this.maplayer)
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
        flex-direction: column;
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
        padding-top:6px;
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
    overflow: scroll;

    display: flex;
    flex-direction: column;
    min-height: max-content;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
 }
 .sidebar::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
 .rotate-180{
     transition: 0.3s linear;
 }

.sidebar-content-container{
    display: flex;
    flex-direction: column;

    min-height: max-content;

    padding:5px;
}

 .checkbox-container{
    /* transition: 0s linear; */
    display:flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-bottom: 5px;
    


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


/* @media screen and (max-width: 800px){
    .sidebar{
        min-width: 100%;
        
    }
} */

</style>
