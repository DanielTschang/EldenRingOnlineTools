<template>
    <div class="sidebar" style="width:100vw">
        <side-bar-link to="/" icon="fa fa-home"> Home </side-bar-link>
        <side-bar-link to="/map" icon="fa fa-home"> Map </side-bar-link>
        <side-bar-link to="/info" icon="fa fa-home"> Info </side-bar-link>
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

<style >
  :root{
    --sidebar-bg-color:black;
    --sidebar-item-hover:grey;
    --sidebar-item-active:green;
  }

</style>

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
