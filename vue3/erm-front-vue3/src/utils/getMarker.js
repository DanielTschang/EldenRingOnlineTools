export default async function getMarkersByType(type){
    const url = "http://localhost:3150/api/marker/"
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsIiwidXNlcklkIjoxMjMsImFjY2Vzc1R5cGVzIjpbImdldE1hcmtlciIsInVwZGF0ZU1hcmtlciIsImFkZE1hcmtlciIsImRlbGV0ZU1hcmtlciJdLCJpYXQiOjE2NzI3MTMzMTMsImV4cCI6MTY3MzU3NzMxM30.rHidO2hhk-a1vI7ZrPuNnQ9sdHtIf7WriLtgMYPO1CzI39VwsK4ASZhFZZbAhdljA7ztZKYpq1E8v0OoaQ2Dpup1f11peevV77QlT4-R5m9ZN_m6cXI3Jj9uzQPLLbB27ws2X_zBcgCKQD9BkNYRgyDI2XKfn15A6elyqpUCS0va9CQQUc0ZO_Km7Xn4UxLPGpZsIykWX08z-Wt7EpqSuMIO3CkVPI0VidbZL27D2QwBSpu5kiz7r4OV38CdjVDvKhx4bMZIcr-KlIhKpj32MUaU8UkD4N4kyarvGXAD6wXTQzM1xCNko291pq8c4Z7fK1ij-iblkHntMWKW4MIkNA");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return await fetch(url+type, requestOptions)
        .then(response => response.json())
        .then(result => result.data )
        .catch(error => console.log('error', error));

}