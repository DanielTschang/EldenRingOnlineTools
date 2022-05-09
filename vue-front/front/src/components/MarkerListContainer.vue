<template>
    <div class="container">
        <div>
            <h1>Elden Ring Online Map</h1>
        </div>
        <div class="row">
            
            <!-- <div class="col-3 brew-list">
                <MarkerList :markers="markers"/>
            </div> -->
            <div class="col-10">
                <MarkerMap :markers="markers"/>
            </div>
        </div>
    </div>
</template>

<script>
    // import MarkerList from './MarkerList.vue'
    import MarkerMap from './MarkerMap.vue'

    const url = "http://localhost:3150/api/siteofgrace"
    export default {
        name: 'MarkerListContainer',
        components:{
            // MarkerList,
            MarkerMap
        },
        props: {
            msg: String
        },
        data: function (){
            return {
                markers:[]
            }
        },
        mounted:function(){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsIiwidXNlcklkIjoxMjMsImFjY2Vzc1R5cGVzIjpbImdldE1hcmtlciIsInVwZGF0ZU1hcmtlciIsImFkZE1hcmtlciIsImRlbGV0ZU1hcmtlciJdLCJpYXQiOjE2NTE5OTI4NTMsImV4cCI6MTY1Mjg1Njg1M30.ccTMUe0UvqLCAnoqKL9rBetyxOabqHQsS9bhEPw8VP8Kv1vHjjtyFt5qggeKZKVFPj0sja-948jHVm-xn3Z16CJKCiBQBYH08w0qldlm8Gyzqf8PsQBe0SnY-eM1-wP3cgfLUbNfRvqsu5QzWgRTFyjH2nqR2zQiwQ77l6q3fyyLyrTQKonkl-b2UyUMSmQPzx_se2sGfUQny8ene1ox2WCzcmJRvl21liQ33xyBLvJj53J1_lKMWd90TFLF9lO3jLmrHMtOHZGG-qaWCH8WU-CpZJ-N2nih01qdZQ8EG7dlQhWRL3FjcN9At6v8xD2CClMJGnJVKjke99a75oy39g");

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .brew-list{
    overflow-y:scroll;
    height: 95vh;
    }
</style>

