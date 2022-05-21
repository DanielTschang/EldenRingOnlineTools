<template>
    
        <div class="sidebar" :style="{width:sidebarWidth}">
            
                <span
                    class="collapse-icon"
                    :class="{'rotate-180':!collapsed}"
                    @click="toggleSidebar"
                >
                    <i class="fa fa-angle-double-left"></i>
                </span>



                <div v-if="collapsed" class="checkbox-container">
                    
                    <transition-group name="checkbox" appear>
                        <div :key="'location'">
                            <h>-地點-</h>
                        </div>
                        <div class="checkbox-item" :key="type.id" v-for="type in Locations">    
                            <input type="checkbox" :id="type.id" :value="type.enname" v-model="checkedTypes" @change="changeTypes()">
                            <label :for="type.zhname">{{ type.zhname }}</label>
                        </div>

                        <div :key="'items'">
                            <h>-物品-</h>
                        </div>
                        <div class="checkbox-item" :key="type.id" v-for="type in Items">    
                            <input type="checkbox" :id="type.id" :value="type.enname" v-model="checkedTypes" @change="changeTypes()">
                            <label :for="type.zhname">{{ type.zhname }}</label>
                        </div>
                        <div :key="'enemy'">
                            <h>-敵人-</h>
                        </div>

                        <div class="checkbox-item" :key="type.id" v-for="type in Enemy">    
                            <input type="checkbox" :id="type.id" :value="type.enname" v-model="checkedTypes" @change="changeTypes()">
                            <label :for="type.zhname">{{ type.zhname }}</label>
                        </div>

                        <div :key="'equipment'">
                            <h>-裝備-</h>
                        </div>
                        <div class="checkbox-item" :key="type.id" v-for="type in Equipments">    
                            <input type="checkbox" :id="type.id" :value="type.enname" v-model="checkedTypes" @change="changeTypes()">
                            <label :for="type.zhname">{{ type.zhname }}</label>
                        </div>


                        <div :key="'other'">
                            <h>-其他-</h>
                        </div>
                        <div class="checkbox-item" :key="type.id" v-for="type in Other">    
                            <input type="checkbox" :id="type.id" :value="type.enname" v-model="checkedTypes" @change="changeTypes()">
                            <label :for="type.zhname">{{ type.zhname }}</label>
                        </div>
                        
                    
                    </transition-group>
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
    // components:{
    //     MapSideBarCheckbox
    // },

    data(){
        return{
            title:"hi",
            checkedTypes:[],
            collapsed:null,
            collapedWidth:30,
            openWidth:200,
        }
    },
    setup(){

        return { Locations, Enemy, Items, Equipments, Other}
    },
    created(){
        let sidebarToggled = getCookie('sidebar');
        this.collapsed = sidebarToggled == "false" ? false : true;
    },
    methods:{
        toggleSidebar(){
            this.collapsed = !this.collapsed
            setCookie('sidebar',this.collapsed)
        },
        changeTypes(){
            this.$emit("changeTypes",this.checkedTypes)
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
        transition: opacity 1s 
    }
    .checkbox-leave-active{
        transition: opacity 0.2s;
    }
    .checkbox-enter-from,
    .checkbox-leave-to{
        opacity: 0;
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
    border-end-end-radius: 20px;
    
    transition: 0.3s ease;

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
     float:left
 }
</style>
