
import { useEffect, useState } from "react";
import { Marker, Popup } from 'react-leaflet'

const LeafletCanvasLayer = (name,lng,lat) => {
    return (
        <Marker position={[lng,lat]} >
            <Popup>
                <div>{name}</div>
            </Popup>
        </Marker>

    )

}

export default LeafletCanvasLayer