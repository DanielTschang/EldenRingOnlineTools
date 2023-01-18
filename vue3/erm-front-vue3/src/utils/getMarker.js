export default async function getMarkersByType(type){
    const url = "http://localhost:3150/api/marker/"
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsIiwidXNlcklkIjoxMjMsImFjY2Vzc1R5cGVzIjpbImdldE1hcmtlciIsInVwZGF0ZU1hcmtlciIsImFkZE1hcmtlciIsImRlbGV0ZU1hcmtlciJdLCJpYXQiOjE2NzM5NzA2NzgsImV4cCI6MTY3NDgzNDY3OH0.g6rEU-Ini-NZNz5qg1SY4V-rYi2m3YeLUU7SzShGahRxuhp-2fKmZDrD-gLoOaQFLk-u87l3LdIa00ef-m6S0lCBX-RjOS95F_hxLUVkOKXmAYcwbbEj-WyndSg14elQA83uSpv84Ncu7ghYnWaTDLAD4WuXn-EyoywEzjywoh_cePLvnYXfFnsq3XsUh66pWHX6xHPfunTuQB479RkJhAoAzT9SouZgRuUTrg238ottLePpQGj9xtnshWYObYtrgdBiBflztgZpQhxwdVH7-6c304rDXP4DzAWMR-H6bIn2qwZuxZslqV-ettHtypW_AL4WoSTM_uQ2o8kpReGBRA");

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

export async function getAllMarkers(type){
    const url = "http://localhost:3150/api/marker/"
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsIiwidXNlcklkIjoxMjMsImFjY2Vzc1R5cGVzIjpbImdldE1hcmtlciIsInVwZGF0ZU1hcmtlciIsImFkZE1hcmtlciIsImRlbGV0ZU1hcmtlciJdLCJpYXQiOjE2NzM5NzA2NzgsImV4cCI6MTY3NDgzNDY3OH0.g6rEU-Ini-NZNz5qg1SY4V-rYi2m3YeLUU7SzShGahRxuhp-2fKmZDrD-gLoOaQFLk-u87l3LdIa00ef-m6S0lCBX-RjOS95F_hxLUVkOKXmAYcwbbEj-WyndSg14elQA83uSpv84Ncu7ghYnWaTDLAD4WuXn-EyoywEzjywoh_cePLvnYXfFnsq3XsUh66pWHX6xHPfunTuQB479RkJhAoAzT9SouZgRuUTrg238ottLePpQGj9xtnshWYObYtrgdBiBflztgZpQhxwdVH7-6c304rDXP4DzAWMR-H6bIn2qwZuxZslqV-ettHtypW_AL4WoSTM_uQ2o8kpReGBRA");

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