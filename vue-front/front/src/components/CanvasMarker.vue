<template>

    <div>
    <canvas ref="MarkerCanvas" id="mycanvas" width="30" height="30" style=" border: 1px solid blue; background:blue"/>
    </div>

</template>

<script>


export default {
    name: 'CanvasMarker',

    mounted(){
        var canvas = this.$refs.MarkerCanvas
        var ctx = canvas.getContext("2d");
        this.vueCanvas = ctx;
        this.updateCanvas()
        
        imageObj.onload = function(){
            context.drawImage(imageObj,10,10);

        };
        imageObj.src = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/morgotts-great-rune-key-item-elden-ring-wiki-guide.png"
        

    },
    methods:{
        updateCanvas(){
            this.vueCanvas.fillStyle="black"
            this.vueCanvas.font = "10pt Calibri";
            this.vueCanvas.fillText("My TEXT!",0,10)

        }
    }
}
</script>

<style>

</style>