export default async function getMarkersByType(type){
    const url = "http://localhost:3150/api/marker/"
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsIiwidXNlcklkIjoxMjMsImFjY2Vzc1R5cGVzIjpbImdldE1hcmtlciIsInVwZGF0ZU1hcmtlciIsImFkZE1hcmtlciIsImRlbGV0ZU1hcmtlciJdLCJpYXQiOjE2NTI4NTMxMzgsImV4cCI6MTY1MzcxNzEzOH0.pnpGQKWHscMbfRu1MZ6hvS50fEBoXiF5gwnuR9l5gH1ZsBo65Bw61EP5TJSn_bdyu-_jXorl-S6f6qk2X2PipBjsNdG_7pLet1tj4tvgNlWn_PlWxLj97D0LicsIYv1LYPflgiTleSlR0qkmwgKPXP-Y0yTlrAxdj8aXJT82KvDbi81m5_WCpJoAF3eXmSNoqAYYG7lw2zP-QcZM_DhV2cXogebqh9jcxydSzRvaaIRchmcYZDnLyAFcK8V0Z0qsQO8g-Cfp0k2Z320Ra-sWGrAWame62hbcdpEbVjaqbEaIl-DNEGnAhJsHKa5cHW1MEdDLTMuScBZ2IPKD9fg7JQ");

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