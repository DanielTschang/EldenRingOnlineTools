<template>

    <div
        style="width: 30px; height: 30px; border: 1px solid blue; background-color:red"
    >
        <canvas ref="MarkerCanvas" width="30" height="30"></canvas>
    </div>

</template>

<script>


export default {
    name: 'CanvasMarker',
    components: {

    },
    props:{
        name:String,
        imgurl:String
    },
    mounted:function(){
        this.canvas = this.$refs.MarkerCanvas;
        this.context = this.canvas.getContex("2d");
        let imageObj = new Image();

        imageObj.onload = function(){
            this.context.drawImage(imageObj,10,10);
            this.context.font = "40pt Calibri";
            this.context.fillText("My TEXT!", 20,20)
        };
        imageObj.src = "https://eldenring.wiki.fextralife.com/file/Elden-Ring/morgotts-great-rune-key-item-elden-ring-wiki-guide.png"
        

    }
}
</script>

<style>

</style>