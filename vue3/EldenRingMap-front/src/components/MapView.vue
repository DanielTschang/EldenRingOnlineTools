<template>
    <div >
        <div>
            <h1>Elden Ring Online Map</h1>
        </div>
        <div>
            <MapContainer :markers="markers"/>

        </div>
    </div>
</template>

<script>
    import MapContainer from '@/components/MapContainer.vue'
    const url = "http://localhost:3150/api/marker/all"
    export default {
        name: 'MapView',
        components:{
            MapContainer
        },
        data(){
            return {
                markers:[]
            }
        },
        mounted(){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsIiwidXNlcklkIjoxMjMsImFjY2Vzc1R5cGVzIjpbImdldE1hcmtlciIsInVwZGF0ZU1hcmtlciIsImFkZE1hcmtlciIsImRlbGV0ZU1hcmtlciJdLCJpYXQiOjE2NTI2ODY3NTcsImV4cCI6MTY1MzU1MDc1N30.WyMlNL0br6Qc578qbMbHttmLm_Xsy_1ymVLyJMNweZl731dUdGtlyZZQdd3YBnvOOpcnysG0v1-jOlKmhfogaUcY3BOmytujrmB3HR5QgdSOWSUvhl08M7J1HR3yKpN8PIxq8A8-82GU1pagG1jrLEisGLS373gg1sZmHf__-MEkTLi6APZBAsRGnhFNIyvuy0GIkbq-1j7d2A59CUNtiqfmbmPwJvBw_E9AF_xQ2BU33Kw_7ahjhxy85UTX_WvZZwao3P8KqXcYq3kN9TosXxSIi0bRMKV0g-YsZcIqNiFBQ5dLwiavCmYUUfWToSsnlbeab0VusNtb2ONjSPS9VA");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.markers = result.data
                    console.log(this.markers)
                })
                .catch(error => console.log('error', error));

        }
    }
</script>

<style>

</style>