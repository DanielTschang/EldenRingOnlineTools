<template> 
    <div class="map-label">
        <img class="map-label-image" :src="url">
        <!-- <h4 :class="{hide: !show}" class="map-label-text">{{name}}</h4> -->
    </div>
</template>

<script>
export default {
    name:"IconMarker",
    props:{
        name:String,
        url:String,
        show:Boolean,
    },
}
</script>

<style scoped>
    *{
        margin:0;
        padding:0;
    }
    .map-label {
        position: relative;
        bottom: 0;
        left: -50%;
        display: flex;
        flex-direction: row;
        text-align: center;
        width:3vw;
        height:3vh;
        
    }
    .map-label-image{
        position: relative; 
    }
    /*Wrap the content of the divicon (text) in this class*/
    .map-label-text {
        position: relative; 
        padding: 3px;
        white-space: nowrap;

    }



</style>