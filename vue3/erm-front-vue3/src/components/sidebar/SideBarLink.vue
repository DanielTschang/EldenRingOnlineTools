<template>
  <router-link :to="to" class="link" :class="{active: isActive}">
      <i class="icon" :class="icon"/>
      <slot/>
  </router-link>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router'
import { collapsed } from '@/utils/SidebarState';

export default {
    props:{
        to:{type:String, required:true},
        icon:{type:String, required:true},
    },
    setup(props){
        const route = useRoute();
        const isActive = computed (() => route.path === props.to)
        return {isActive, collapsed}
    }
}
</script>

<style scoped>
.link{
    display:flex;
    flex-direction: column;
    align-items: center;
    

    position: relative;
    font-weight: 400;
    user-select: none;
    cursor:url("../../../public/cursor_resized.png"),auto;
    margin:0.1em 0.1em;
    padding: 0.4em;
    border-radius:0.25em;
    height:1.5em;
    width:100%;
    height: 90%;
    color:white;
    text-decoration: none;
}
.link:hover{
    background-color:var(--sidebar-item-hover);
}
.link.active{
    background-color: var(--sidebar-item-active);
}
.link .icon {
    flex-shrink:0;
    width:25px;
    margin-right:10px;
}
</style>