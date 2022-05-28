<template>
  <router-link :to="to" class="link" :class="{active: isActive}">
      <img :src="iconPath">
      <slot/>
  </router-link>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router'

export default {
    props:{
        to:{type:String, required:true},
        icon:{type:String, required:true},
    },
    setup(props){
        const route = useRoute();
        const isActive = computed (() => route.path === props.to)
        const iconPath = require("@/assets/"+props.icon + ".png")
        return {isActive, iconPath }
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
    opacity: 1;
    transition: 0.3s ease;
}
.link:hover{
    background-color:var(--sidebar-item-hover);
    opacity: 0.7;
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