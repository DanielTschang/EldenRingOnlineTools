<template>
    <div class="sidebar" style="width:100vw">
        <side-bar-link to="/map" icon="map"> Map </side-bar-link>
        <side-bar-link to="/AR" icon="ARR"> AR calculator </side-bar-link>
        <side-bar-link to="/info" icon="settings"> Info </side-bar-link>
    </div>
</template>

<script>
import { collapsed, toggleSidebar, sidebarWidth } from "@/utils/SidebarState";
import SideBarLink from '@/components/sidebar/SideBarLink.vue';


export default {
    name:"SideBar",
    components:{
        SideBarLink
    },
    props:{},
    setup(){
        return { collapsed, toggleSidebar, sidebarWidth }
    }
}
  
</script>


<style scoped>
  .sidebar {
    color:white;
    background-color: black;

    float:bottom;
    position:fixed;
    z-index:10000;
    left:0;
    right:0;
    bottom:0;
    height: 7vh;
    
    transition: 0.3s ease;

    display: flex;
    flex-direction: row;
    justify-content:space-evenly;
  }
</style>
