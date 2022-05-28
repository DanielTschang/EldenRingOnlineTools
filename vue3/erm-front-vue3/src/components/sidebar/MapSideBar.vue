<template>
    
        <div class="sidebar" :style="{width:sidebarWidth}">
            
                <span
                    class="collapse-icon"
                    :class="{'rotate-180':!collapsed}"
                    @click="toggleSidebar"
                >
                    <i class="fa fa-angle-double-left"></i>
                </span>

                <div  v-if="collapsed" class="checkbox-container">
                    <!-- <div class="position-container">
                        <h1>hi</h1>
                    </div> -->

                    <div class="checkbox-container">
                        <transition-group name="checkbox" appear>
                        <div :key="'location'">
                            <h>-地點-</h>
                        </div>
                        <div class="checkbox-item" :key="type.id" v-for="type in Locations">    
                            <input type="checkbox" :id="type.zhname" :value="type.enname" v-model="filterType" @change="changeTypes()">
                            <label :for="type.zhname">{{ type.zhname }}</label>
                        </div>

                        <div :key="'items'">
                            <h>-物品-</h>
                        </div>
                        <div class="checkbox-item" :key="type.id" v-for="type in Items">    
                            <input type="checkbox" :id="type.zhname" :value="type.enname" v-model="filterType" @change="changeTypes()">
                            <label :for="type.zhname">{{ type.zhname }}</label>
                        </div>
                        <div :key="'enemy'">
                            <h>-敵人-</h>
                        </div>

                        <div class="checkbox-item" :key="type.id" v-for="type in Enemy">    
                            <input type="checkbox" :id="type.zhname" :value="type.enname" v-model="filterType" @change="changeTypes()">
                            <label :for="type.zhname">{{ type.zhname }}</label>
                        </div>

                        <div :key="'equipment'">
                            <h>-裝備-</h>
                        </div>
                        <div class="checkbox-item" :key="type.id" v-for="type in Equipments">    
                            <input type="checkbox" :id="type.zhname" :value="type.enname" v-model="filterType" @change="changeTypes()">
                            <label :for="type.zhname">{{ type.zhname }}</label>
                        </div>


                        <div :key="'other'">
                            <h>-其他-</h>
                        </div>
                        <div class="checkbox-item" :key="type.id" v-for="type in Other">    
                            <input type="checkbox" :id="type.zhname" :value="type.enname" v-model="filterType" @change="changeTypes()">
                            <label :for="type.zhname">{{ type.zhname }}</label>
                        </div>
                        </transition-group>
                    </div>
                    
                </div>
           
            
    </div>
  
</template>

<script>
// import {collapsed, toggleSidebar ,sidebarWidth } from "@/utils/SidebarState";
// import MapSideBarCheckbox from '@/components/sidebar/MapSideBarCheckbox.vue';
import { Locations, Enemy, Items, Equipments, Other} from "@/utils/markerType"
import { setCookie, getCookie } from '@/utils/Cookies'

export default {  
    name:"MapSideBar",
    props:{
        initfilterType:Array
    },

    data(){
        return{
            filterType:[],
            collapsed:null,
            collapedWidth:30,
            openWidth:230,
        }
    },
    setup(){
        return { Locations, Enemy, Items, Equipments, Other}
    },
    created(){
        this.filterType = this.initfilterType
        this.$emit("changeTypes",this.filterType)
        let sidebarToggled = getCookie('sidebar');
        this.collapsed = sidebarToggled == "false" ? false : true;
    },
    methods:{
        toggleSidebar(){
            this.collapsed = !this.collapsed
            setCookie('sidebar',this.collapsed)
        },
        changeTypes(){
            this.$emit("changeTypes",this.filterType)
        }
        
    },
    computed:{
        sidebarWidth(){
            return `${this.collapsed ? this.openWidth : this.collapedWidth}px`
        }
    }
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
        width:100%;
        height: 30px;
    }

    .collapse-icon{
        padding-top:3px;
    }

  .sidebar {
    color:white;
    background-color:rgba(0, 0, 0, 0.7);

    float:right;
    position:fixed;
    z-index:10000;
    left:0;
    bottom:0;
    top:5vh;
    width: 7vw;
    height: 80vh;
    /* border-end-end-radius: 20px; */
    border-image: url("@/assets/borderImage.png");
    border-image-repeat:round;
    border-image-slice:30 50 fill;
    border-image-width:25px 40px;
    transition: 0.2s ease;
    padding:3px;

    display: flex;
    flex-direction: column
 }
 .rotate-180{
     transition: 0.3s linear;
 }
 .checkbox-container{
     /* transition: 0s linear; */
     display: flex;
     flex-direction: column;
     width:100%;
     height: 95%;
     flex-wrap: wrap;
     justify-content: flex-start;
     align-items:flex-start;
     padding:5px;

 }
 .checkbox-item{
     float:left;
     max-width: 50%;
     margin:0.1px 1.5px;
 }
 .checkbox-item input{
     margin-right:3px
 }
 .checkbox-item label{
     font-size: 10px;
 }
</style>
