<template>
    <router-link :to="to" class="link" :class="{active: isActive}">
            <img style="height:25px; width:25px" :src="iconPath">
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
.router-container{


}
.link{
    z-index: 100000000;
    width:100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    position: relative;
    opacity: 1;
    transition: 0.3s ease;
    display:flex;
    flex-direction: column;
    padding:10px;
    
    font-weight: 400;
    user-select: none;
    padding: 0.2em;
    border-radius:0.25em;

    color:rgb(249, 246, 241);
    overflow: hidden;
}
.link *{

}
.link:hover{
    background-color:var(--sidebar-item-hover);
    opacity: 0.7;
}
.link.active{
    background-color: rgb(171, 150, 111);
}
.link .icon {
    flex-shrink:0;
    width:20px;

}
</style>