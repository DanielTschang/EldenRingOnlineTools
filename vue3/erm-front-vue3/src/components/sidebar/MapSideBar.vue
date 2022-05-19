<template>
    <div class="sidebar" :style="{width:sidebarWidth}">
        <span
            class="collapse-icon"
            @click="toggleSidebar"
        >
            <i class="fa fa-angle-double-left"></i>
        </span>
  </div>
</template>

<script>
import { collapsed, toggleSidebar, sidebarWidth } from "@/utils/SidebarState";

export default {
    name:"MapSideBar",
    props:{},
    setup(){
        return { collapsed, toggleSidebar, sidebarWidth }
    }
}
  
</script>

<style >
  :root{
    --sidebar-bg-color:black;
    --sidebar-item-hover:white;
    --sidebar-item-active:green;
  }

</style>

<style scoped>
  .sidebar {
    color:white;
    background-color: black;

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
</style>
