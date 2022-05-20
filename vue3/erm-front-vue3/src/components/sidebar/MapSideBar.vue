<template>
    <div class="sidebar" :style="{width:sidebarWidth}">
        <span
            class="collapse-icon"
            :class="{'rotate-180':collapsed}"
            @click="toggleSidebar"
        >
            <i class="fa fa-angle-double-left"></i>
        </span>
        <transition name="checkbox">
            <div v-if="!collapsed" class="checkbox-container">
                    <input type="checkbox" id="cbox1" value="first_checkbox">
                    <label for="cbox1">賜福</label>
                    <input type="checkbox" id="cbox1" value="first_checkbox">
                    <label for="cbox1">賜福</label>
            </div>
        </transition>
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


<style scoped>
    .checkbox-enter-active{
        transition: opacity 0.6s;
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
    background-color: black;
    opacity: 0.5;

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
