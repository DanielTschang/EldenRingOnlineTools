export default async function getMarkersByType(type){
    const url = "http://localhost:3150/api/marker/"
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsIiwidXNlcklkIjoxMjMsImFjY2Vzc1R5cGVzIjpbImdldE1hcmtlciIsInVwZGF0ZU1hcmtlciIsImFkZE1hcmtlciIsImRlbGV0ZU1hcmtlciJdLCJpYXQiOjE2NTM3NTQ5MDcsImV4cCI6MTY1NDYxODkwN30.SQ7APjRfMTZFEaN-PJmd0Q1kugiyl6p6dSYgMmGUo3s3Rzj32Wn2WDfOL6EnU-hB3GBIYdYo7B1XK4SPbhi7YQU52JfN3lpwNp8sFqhpywgLjYW5gyf_VETyihiK8kSjn5PVLDvRo7cSkmT4mUq7ugc7xt2GfEtDAWIqwNYSpNgB9ZNlHNg2hRgRMujNjxjH__D-iy9d8LfjAod0nRGJ_AXrQPBVIfni9mPHIpWxZ4UqMiAKrDx0pByNNTfIH54iiL7vVAHtWZCmIhd4vF0AxB5GUEmf_dsdqGiWgymkeixUUBSjczYhiUL8M_AnA3h2hNebEbG5AIVW86kDDDyfvw");

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