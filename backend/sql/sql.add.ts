

export const MarkerAdd = {
    AddMarker:`
        INSERT INTO map (name,type,lat,lng,des) VALUES (? ,? ,?, ?, ?, ?)
    `,
}