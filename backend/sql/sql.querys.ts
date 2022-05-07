
export const MarkerQueries = {
    GetAllMarker:`
        SELECT * FROM map
    `,
    GetMarkerByType:`
        SELECT * FROM map Where type = ?
    `,
    GetMarkerById:`
        SELECT * FROM map Where id = ?
    `
}