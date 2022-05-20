<template>
    
        <div class="sidebar" :style="{width:sidebarWidth}">
            
                <span
                    class="collapse-icon"
                    :class="{'rotate-180':collapsed}"
                    @click="toggleSidebar"
                >
                    <i class="fa fa-angle-double-left"></i>
                </span>


                <div v-if="collapsed" class="checkbox-container">
                    <transition-group name="checkbox" appear>
                            <div class="checkbox-item" :key="type.id" v-for="type in MarkerType">    
                                <input type="checkbox" :id="type.id" :value="type.zhname" v-model="checkedNames">
                                <label :for="type.zhname">{{ type.zhname}}</label>
                            </div>
                        
                    
                    </transition-group>
                </div>
            
            
    </div>
  
</template>

<script>
// import {collapsed, toggleSidebar ,sidebarWidth } from "@/utils/SidebarState";
// import MapSideBarCheckbox from '@/components/sidebar/MapSideBarCheckbox.vue';
import MarkerType from "@/utils/markerType"
import { setCookie, getCookie } from '@/utils/Cookies'

export default {  
    name:"MapSideBar",
    // components:{
    //     MapSideBarCheckbox
    // },
    props:{},
    data(){
        return{
            title:"hi",
            collapsed:null,
            checkedNames:[]
        }
    },
    setup(){

        return { MarkerType }
    },
    created(){
        let sidebarToggled = getCookie('sidebar');
        this.collapsed = sidebarToggled == "false" ? false : true;
    },
    methods:{
        removeValue(arr, value){
            return arr.filter((ele)=>{
                return ele != value;
            })
        },
        updateChecked(value){
            this.checkedNames = this.removeValue(this.checkedNames,value);
        },
        toggleSidebar(){
            this.collapsed = !this.collapsed
            setCookie('sidebar',this.collapsed)
        }
    },
    computed:{
        sidebarWidth(){
            return `${this.collapsed ? 200 : 30}px`
        }
    }
}
  
</script>


<style scoped>
    .checkbox-enter-active{
        transition: opacity 0.8s 
    }
    .checkbox-leave-active{
        transition: opacity 0.2s;
    }
    .checkbox-enter-from,
    .checkbox-leave-to{
        opacity: 0;
    }


  .sidebar {
    color:white;
    background-color:rgba(0, 0, 0, 0.7);

    float:right;
    position:fixed;
    z-index:10000;
    left:0;
    bottom:0;
    top:5vh;
    width: 7vw;
    height: 80vh;
    border-end-end-radius: 20px;
    
    transition: 0.3s ease;

    display: flex;
    flex-direction: column
 }
 .rotate-180{
     transition: 0.2s linear;
 }
 .checkbox-container{
     /* transition: 0s linear; */
     display: flex;
     flex-direction: column;
     width:100%;
     height: 95%;
     flex-wrap: wrap;
     justify-content: flex-start;
     align-items:flex-start;
     padding:5px;

 }
 .checkbox-item{
     float:left
 }
</style>
