<template>
    <input type="checkbox" id={title} value="title" v-model="checkedNames">
    <label for="title">{{title}}</label>
    <br>
    
</template>

<script>
export default {
    name:"MapSideBarCheckbox",
    props:{
        title:{type:String, required:true},
    },
    methods:{
        select(e){
            console.log(e.target)
        }
    }
    
}
</script>

<style>
    *{
        cursor:url("../../../public/cursor_resized.png") 5 5,auto;
    }
</style>