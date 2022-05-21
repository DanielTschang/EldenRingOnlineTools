
<template>
  <div class="MainContainer">
    <div class="routerview" style="margin-bottom: 7vh">
      <router-view  @LogInTrigger="LogInTrigger"/>
    </div>
    <transition name="login">
      <log-in v-if="LogInTriggered" @LogInTrigger="LogInTrigger"/>
    </transition>
    <SideBar/>

  </div>
</template>



<script>
import SideBar from "@/components/sidebar/SideBar.vue"
import LogIn from './components/auth/LogIn.vue'


export default {
    components:{
        SideBar,
        LogIn,
    },
    setup() {
    },
    methods:{
      LogInTrigger(){
        this.LogInTriggered = !this.LogInTriggered
      }
    },
    data(){
        return {
            userName: null,
            LogInTriggered: false
            
        }
    }
}
</script>


<style lang="scss">


  .login-enter-active{
    transition: opacity 0.15s 
  }
  .login-leave-active{
    transition: opacity 0.15s;
  }
  .login-enter-from,
  .login-leave-to{
    opacity: 0;
  }

  .test{
    position: absolute;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  
  }
  :root{
    --sidebar-bg-color:black;
    --sidebar-item-hover:grey;
    --sidebar-item-active:green;
  }
  *{
    cursor: url('../public/cursor_resized.png') 5 5 ,pointer;
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

