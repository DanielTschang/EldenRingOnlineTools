<template>

    <div class="card" style="width: 18rem;">
        <ul class="list-group list-group-flush">
            <li class="list-group-item" style="width:100%" v-for="marker in markers" v-bind:key="marker.id">
                {{marker.name}}{{marker.type}}
            </li>
        </ul>
    </div>

</template>

<script>

    export default {
        name: 'MarkerList',
        props:{
            markers:Array
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    li {
        width: 100%;
        &:hover{
            background-color: darkgrey;
        }
    }
  
</style>
