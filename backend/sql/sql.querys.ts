
export const MarkerQueries = {
    GetAllMarker:`
        SELECT * FROM map LIMIT 3000
    `,
    GetMarkerByType:`
        SELECT * FROM map Where type = ?
    `,
    GetMarkerById:`
        SELECT * FROM map Where id = ?
    `
}