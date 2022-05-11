<template>
    <div >
        <div>
            <h1>Elden Ring Online Map</h1>
        </div>
        <div>
            <MarkerMap :markers="markers"/>

        </div>
    </div>
</template>

<script>
    import MarkerMap from './MarkerMap.vue'

    const url = "http://localhost:3150/api/all"
    export default {
        name: 'MarkerListContainer',
        components:{
            MarkerMap
        },
        data: function (){
            return {
                markers:[]
            }
        },
        mounted:function(){
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsIiwidXNlcklkIjoxMjMsImFjY2Vzc1R5cGVzIjpbImdldE1hcmtlciIsInVwZGF0ZU1hcmtlciIsImFkZE1hcmtlciIsImRlbGV0ZU1hcmtlciJdLCJpYXQiOjE2NTIyNjY1MDMsImV4cCI6MTY1MzEzMDUwM30.ZP3NGxE1TGIWHVtzWB-L6YAJVRt69rSTDCRMXmCMwUo0C_alDpRcOBqv8t3vaBX32ug8cVhullFqFFCYl93ybTJKglac5RR5WUqLOSqxfn46vAuVf2CpAeGRRb0aCVKY70RKsq48YAPOyRsMWeCDc_mQmDf0j6KTXg-eGoJ1N5bHzr6rVtITi1gIRJilm-kNLpg2hwuJNy60N4BTiG3VG2gCj8JbuWxSdVrK-5Dn0eiROoRBF0WmXx5FX4a5xytm4_BjZog3lfAwbaQqPup-DGWkbqbtSXF_j2jZbPLWJni4P_aFHeOnWDt_8gsoZB5J5iVvE31kls2kzYKM4J_eOg");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.markers = result.data
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

