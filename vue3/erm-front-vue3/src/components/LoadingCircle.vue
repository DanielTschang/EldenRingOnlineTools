<template>
    <div class="popup">
        <div class="popupLoading">

            <div class = "loader">
                <img src="@/assets/eldenring_new.png"/>
                <h3 id="loadingtext">Loading Markers</h3>
            </div>
        </div>
    </div>
</template>

<script>


export default {

}
</script>

<style scoped>
    .popup{
        z-index: 1000000;
        position: fixed;
        width:100%;
        height: 100%;
        background-color: rgb(222, 220, 217,0.5);
    }
    .popupLoading{
        opacity: 1;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        width:380px;
        padding:20px 30px;
        background: #222222;
        box-shadow: 2px 2px 5px 5px rgba(0,0,0,0.15);
        border-radius: 10px;

        border-image: url("@/assets/borderImage.png");
        border-image-repeat:round;
        border-image-slice:30 50 fill;
        border-image-width:25px 40px;
        
    }
    .loader{
        animation: spin 2s linear infinite;
    }
    
    #loadingtext{
        color: rgb(171, 150, 111);
        
    }


    @keyframes spin {
        0%   {filter: brightness(0.5);}
        50%  {filter: brightness(1);}
        100% {filter: brightness(0.5);}
    }
</style>