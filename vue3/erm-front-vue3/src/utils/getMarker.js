export default async function getMarkersByType(type){
    const url = "http://localhost:3150/api/marker/"
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsIiwidXNlcklkIjoxMjMsImFjY2Vzc1R5cGVzIjpbImdldE1hcmtlciIsInVwZGF0ZU1hcmtlciIsImFkZE1hcmtlciIsImRlbGV0ZU1hcmtlciJdLCJpYXQiOjE2NjA1NTkwNjcsImV4cCI6MTY2MTQyMzA2N30.UZ0jlCUyzxChVGjqNSb2Wj-bg9nntuJiP8oU3gh74Mrgiz0u6Yy38ypF2ZLmEdiqqOodnnO8LtV3PqMQjEMF-T0GuB50VxkFmlSUl9CyZD6F_uYXiBogCcDWq59jqgWUI-xIz_opZi3We5wgX6hP9EkseBObeqteYSXUrXxd-1biYTut_3Y_peI_QPi0zrR9nbdk3jmjr-Z-xPecbk26ccrjeipYxEyv8nRGGSVEBcRdlwSm9UqMqRfZ0VQbzm5c3pILhY8r6O3eGhOxKhf3CnED2hW4vy5MDOhDuo81ckN-6SH9eXZgk4196hm-GMlW9-ZmqVtsY6HI8zOgfu1XoQ");

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