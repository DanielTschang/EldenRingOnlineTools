<template>
    <div class="sidebar" style="width:100vw">
        <side-bar-link to="/map" icon="map"> Map </side-bar-link>
        <side-bar-link to="/AR" icon="ARR"> AR calculator </side-bar-link>
        <side-bar-link to="/account" icon="ARR"> Account </side-bar-link>
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
    color:rgb(34, 34, 34);
    background-color: rgb(34, 34, 34);
    box-shadow:  0 0 15px 0 rgb(171, 150, 111) ;
    box-sizing: content-box;

    float:bottom;
    position:fixed;
    z-index:1000;
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
