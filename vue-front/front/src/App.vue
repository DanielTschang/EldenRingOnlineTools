

<template>
  <div id="app">

    <MarkerListContainer/>
  </div>
</template>

<script>
  import MarkerListContainer from './components/MarkerListContainer.vue'

  export default {
    name: 'App',
    components: {
      MarkerListContainer,
    }
  }
</script>

<style>
#app {

  text-align: center;

}
</style>
