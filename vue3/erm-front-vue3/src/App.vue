
<template>
  <div class="MainContainer">
    <div class="routerview" style="margin-bottom: 7vh">

    <router-view v-slot="{ Component }" include="markers" @LogInTrigger="LogInTrigger" v-if="$route.meta.keepAlive" :key="key">
      <keep-alive>
        <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
    </router-view>

      <!-- <keep-alive>
      <router-view  include="markers" @LogInTrigger="LogInTrigger" v-if="$route.meta.keepAlive" :key="key"></router-view> 
      </keep-alive> -->
      <!-- <router-view  @LogInTrigger="LogInTrigger" v-if="!$route.meta.keepAlive" :key="key"></router-view> -->
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
    --sidebar-item-active:rgba(235, 233, 79, 0.339);
  }
  *{
    cursor: url('../public/cursor_resized.png') 5 5 ,pointer;
  }
  .MainContainer{
    display: flex;
    flex-direction: column;
    background-color: #222222;
  }

  .routerview{
    background-color: #222222;
  }


  nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #989898;
      }
    }
  }
</style>

