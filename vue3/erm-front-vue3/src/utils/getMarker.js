export default async function getMarkersByType(type){
    const url = "http://localhost:3150/api/marker/"
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsIiwidXNlcklkIjoxMjMsImFjY2Vzc1R5cGVzIjpbImdldE1hcmtlciIsInVwZGF0ZU1hcmtlciIsImFkZE1hcmtlciIsImRlbGV0ZU1hcmtlciJdLCJpYXQiOjE2NTI2ODE5NjQsImV4cCI6MTY1MzU0NTk2NH0.k01esUSbMWfvS0EIa2q91AZ5_ngX8l_BAlfVEscCLCFHuhUnw2qMrGammPv4jZzhfCIXt4qfD-NxrGNCzDdlW642-1s0dbiAw82jp6n-_41IP2u8tFSWLwX8q_OEbeLARlgz-dOrpGlTjldkNldS26vuV3TLaye_K8O3x8IUK3hqTwMo-H-4voQ22kbvXa1JIwR_bzrWj2UBQm44a1pFn4c3BbBhL0VVzK_vTgOyESbK4sA32BkZCe6fT9Z1yeuEJ5vZktBPfnoZuCSJ2wxiCJ7DcVMyWoje131TmTChXaZAo3iJk9ulDMacU_M5ilF2jSJ4E2dRggWol5XoMKxSuA");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(url+type, requestOptions)
        .then(response => response.json())
        .then(result => result.data )
        .catch(error => console.log('error', error));

}