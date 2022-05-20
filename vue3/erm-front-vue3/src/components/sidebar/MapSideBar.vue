<template>
    <div class="sidebar" :style="{width:sidebarWidth}">
        <span
            class="collapse-icon"
            :class="{'rotate-180':collapsed}"
            @click="toggleSidebar"
        >
            <i class="fa fa-angle-double-left"></i>
        </span>
        <div v-if="!collapsed" class="checkbox-container">
            <transition name="checkbox">     
                    <MapSideBarCheckbox :title="title"/>
            </transition>
        </div>
  </div>
</template>

<script>
import { collapsed, toggleSidebar, sidebarWidth } from "@/utils/SidebarState";
import MapSideBarCheckbox from '@/components/sidebar/MapSideBarCheckbox.vue';

export default {  
    name:"MapSideBar",
    components:{
        MapSideBarCheckbox
    },
    props:{},
    data(){
        return{
            title:"hi",
            checkedNames:[]
        }
    },
    setup(){
        return { collapsed, toggleSidebar, sidebarWidth }
    },
    methods:{
        removeValue(arr, value){
            return arr.filter((ele)=>{
                return ele != value;
            })
        },
        updateChecked(value){
            this.checkedNames = this.removeValue(this.checkedNames,value);
        }
    }
}
  
</script>


<style scoped>
    .checkbox-enter-active{
        transition: opacity 0.4s;
    }
    .checkbox-leave-active{
        transition: opacity 0.1s;
    }
    .checkbox-enter-from,
    .checkbox-leave-to{
        opacity: 0;
    }


  .sidebar {
    color:white;
    background-color: black;
    opacity: 0.7;

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
     transition: 0.2s linear;
 }
</style>
