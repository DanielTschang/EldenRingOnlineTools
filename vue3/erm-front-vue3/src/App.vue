
<template>
  <div class="MainContainer">
    <div class="routerview" style="margin-bottom: 7vh">
      <router-view/>
    </div>
    <SideBar/>
  </div>
</template>



<script>
import SideBar from "@/components/sidebar/SideBar.vue"
export default {
  components:{
    SideBar
  },
  setup() {
    
  },
}
</script>


<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  :root{
    --sidebar-bg-color:green;
    --sidebar-bg-item-hover:white;
    --sidebar-bg-item-active:black;
  }
  .MainContainer{
    display: flex;
    flex-direction: column;
  }


  nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>

