module.exports.AllData = "SELECT * FROM map";
module.exports.SiteOfGrace = "SELECT * FROM map WHERE type='SiteOfGrace'";

export const MarkerQueries = {
    GetAllMarker:`
        SELECT * FROM map
    `,
    GetSpecificMarker:`
        SELECT * FROM map Where type = ?
    `
}