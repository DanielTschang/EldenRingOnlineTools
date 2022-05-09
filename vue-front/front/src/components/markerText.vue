<template>
    <h4 v-show="show" class="map-label-text">{{name}}</h4>
</template>

<script>
export default {
    name:"markerText",
    props:{
        name:String,
        show:Boolean
    }
}
</script>

<style>

</style>