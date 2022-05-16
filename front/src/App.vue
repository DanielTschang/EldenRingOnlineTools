

<template>
<div id="app">
  <b-nav-item-dropdown text="User" right>
    <b-dropdown-item><router-link to="/login">Login</router-link></b-dropdown-item>
    <b-dropdown-item><router-link to="/register">Register</router-link></b-dropdown-item>
    <b-dropdown-item><router-link to="/logout">Logout</router-link></b-dropdown-item>
    <b-dropdown-item><router-link to="/map">Map</router-link></b-dropdown-item>
  </b-nav-item-dropdown>
  <router-view></router-view>
</div>
</template>

<script>
  // import MarkerListContainer from './components/MarkerListContainer.vue'

  export default {
    name: 'App',
    components: {
      // MarkerListContainer,
    },
    data(){
      return {
        token:null
      }
    },
    mounted(){
      if (localStorage.token){
        this.token = localStorage.token
      }
    }
  }
</script>

<style>
#app {

  text-align: center;

}
</style>
