module.exports.AllData = "SELECT * FROM map LIMIT 5";
module.exports.SiteOfGrace = "SELECT * FROM map WHERE type='SiteOfGrace'";

export const MarkerQueries = {
    GetAllMarker:`
        SELECT * FROM map LIMIT 1
    `,
    GetMarkerByType:`
        SELECT * FROM map Where type = ?
    `,
    GetMarkerById:`
    SELECT * FROM map Where id = ?
    `
}