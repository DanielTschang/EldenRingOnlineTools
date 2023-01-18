<template>
  <div id="main">
      <h1>yo</h1>
      <button @click="LogIn">yoyo</button>
  </div>
</template>

<script>
import { ref } from "vue"


// eslint-disable-next-line
const isOpened = ref(false)
export default {
    name:"InfoView",
    methods:{
        LogIn(){
            this.$emit('LogInTrigger')
        }
    }
}
</script>

<style>

    #main{
        width:100vw;
        height:93vh;
        background:#222222;
    }   
</style>