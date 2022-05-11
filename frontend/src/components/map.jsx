import React, {useEffect, useState} from 'react';

import { MapContainer, TileLayer, useMap, Marker, Popup, AttributionControl } from 'react-leaflet'
import Control from 'react-leaflet-custom-control'
import '../App.css';
import { Button } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

import "leaflet-canvas-marker"
import LeafletCanvasLayer from './canvas.layer';

import L, { marker } from "leaflet";
import { reject } from 'q';
// import CanvasMarkersLayer from 'react-leaflet-canvas-markers'

function MapContent() {
    const map = useMap()
    map.attributionControl.setPrefix('')
    const api_url = "http://localhost:3150/api/all";

    const [markerdata, setMarkerData] = useState([]);
    // const [markerstoshow,setMarkerstoshow] = useState([])

    useEffect(()=>{
        const fetchData = async () => {
            var data = await fetchMarker()
            console.log(data)
            // await renderdata(data)
        }
       
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsIiwidXNlcklkIjoxMjMsImFjY2Vzc1R5cGVzIjpbImdldE1hcmtlciIsInVwZGF0ZU1hcmtlciIsImFkZE1hcmtlciIsImRlbGV0ZU1hcmtlciJdLCJpYXQiOjE2NTE5OTI4NTMsImV4cCI6MTY1Mjg1Njg1M30.ccTMUe0UvqLCAnoqKL9rBetyxOabqHQsS9bhEPw8VP8Kv1vHjjtyFt5qggeKZKVFPj0sja-948jHVm-xn3Z16CJKCiBQBYH08w0qldlm8Gyzqf8PsQBe0SnY-eM1-wP3cgfLUbNfRvqsu5QzWgRTFyjH2nqR2zQiwQ77l6q3fyyLyrTQKonkl-b2UyUMSmQPzx_se2sGfUQny8ene1ox2WCzcmJRvl21liQ33xyBLvJj53J1_lKMWd90TFLF9lO3jLmrHMtOHZGG-qaWCH8WU-CpZJ-N2nih01qdZQ8EG7dlQhWRL3FjcN9At6v8xD2CClMJGnJVKjke99a75oy39g");

        const fetchMarker = async () => {
            
            return await fetch(api_url, {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            })
            .then(response => response.json())
            .then(res=>{
                console.log(res.data)
                setMarkerData(res.data)
                return res.data
                })
            .catch(error => console.log('error', error));
        }
        // const renderdata = async (data) => {
        //     return new Promise ((resolve,reject) => {
        //         try{
        //             let markers = [];
        //             var ciLayer = L.canvasIconLayer({}).addTo(map);
        //             var icon = L.icon({
        //                 iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        //                 iconSize: [20, 18],
        //                 iconAnchor: [10, 9],
        //             });
        //             ciLayer.addMarker(L.marker([10,10],{icon:icon}))

        //             data.forEach(marker=>{
        //                 var mark = L.marker([marker.lat,marker.lng], {icon:icon}).bindPopup(marker.name)
        //                 markers.push(mark);
        //             })
        //             if (markers!==undefined || markers.length!==0){
        //                 ciLayer.addLayer(markers)
        //             }
        //             console.log('yohohfgodjgp')
        //             resolve('y')
        //         }
        //         catch{
        //             reject('e')
        //         }
        //     })
        // }
        fetchData()
        
    },[]);
  

    
    
    // const addMarker = async()=>{
    //     return new Promise((resolve,reject)=>{
    //         try{
    //             markerdata.forEach(marker=>{
    //                 ciLayer.addMarker(L.marker([marker.lat,marker.lng],{icon:icon}))
    //                 // setMarkerstoshow((oldarray)=>[...oldarray, L.marker([marker.lat,marker.lng],{icon:icon}).bindPopup(marker.name)])
    //             })
    //             // ciLayer.addLayers(markerstoshow);
    //             resolve('y')
    //         }
    //         catch (err){
    //             reject(err)
    //         }
    //     })

    // }

    // useEffect(()=>{
    //     async function renderdata(){
    //         let markers = [];
    //         var ciLayer = L.canvasIconLayer({}).addTo(map);
    //         var icon = L.icon({
    //             iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    //             iconSize: [20, 18],
    //             iconAnchor: [10, 9],
    //           });
    //         console.log(markerdata)
    //         markerdata.forEach(marker=>{
    //             var mark = L.marker([marker.lat,marker.lng], {icon:icon}).bindPopup(marker.name)
    //             markers.push(mark);
    //         })
    //         if (markers!==undefined || markers.length!==0){
    //             ciLayer.addLayer(markers)
    //         }
    //     }
    //     renderdata()
    // },[markerdata])



    // const TileURL = "./map/{z}/{x}/{y}.jpg";
    const TileURL = "https://imgs.ali213.net/picfile/eldenring/{z}/{x}/{y}.jpg";
    return (
        <>
            <TileLayer
                className="basemap"
                attribution='&copy;hihihi'
                maxZoom={7}
                minZoom={1}
                tileSize={200}
                zoomOffset={0}
                url={TileURL}
            />
            
            {markerdata.map((marker)=>(
                <Marker position={[marker.lat,marker.lng]} key={marker.id}>
                    <Popup>
                        <div>
                            {marker.name}
                        </div>
                    </Popup>
                </Marker>
            ))}
            {/* <LeafletCanvasLayer/> */}



        </>
    );
}

export default MapContent;

                {/* 
                {markerdata.map(marker=>(
                    <Marker 
                        position={[marker.lat,marker.lng]} 
                        key={marker.id} 
                    >
                        <Popup>
                            <div>{marker.name}</div>
                        </Popup>
                    </Marker>
                ))} */}
                {/* <LeafletCanvasLayer
                    markerdata={markerdata}
                /> */}
