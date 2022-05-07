import React, {useEffect, useState} from 'react';

import { MapContainer, TileLayer, useMap, Marker, Popup, AttributionControl } from 'react-leaflet'
import Control from 'react-leaflet-custom-control'
import './App.css';
import { Button } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
// import LeafletCanvasLayer from './components/canvas.layer';
import CanvasMarkersLayer from 'react-leaflet-canvas-markers'

function App() {

    const api_url = "127.0.0.1/api/all";
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFuaWVsIiwidXNlcklkIjoxMjMsImFjY2Vzc1R5cGVzIjpbImdldE1hcmtlciIsInVwZGF0ZU1hcmtlciIsImFkZE1hcmtlciIsImRlbGV0ZU1hcmtlciJdLCJpYXQiOjE2NTE5NTM3MzgsImV4cCI6MTY1MTk1NzMzOH0.hsvL_o3mIAQFPluJPc2Q_LUXTCCSpEoZYnNXkbCUwNH6xd4PJsHnblJR7PyBejwAHhRUMlDJPbKJfVGrK2sE84C7Hk8idYuIEyu5M5wWq64Bpp-DBIyChOZ81BBH73tYzgUMnfx0gNr5euQPNbwzObG0kcE_8fFeGLugk-_UgL68PSm5c86K0bp58CzCdV9ZXPwF1eYUn7ydgtkB3inXrN0b9-GHuTrVY56KKRsK9luGMsbQlIWhqTIWehHY38RUYy6b1jqgkPWH5_oQrTwKp-6pswMMPipf_YpTemM73K9z9ESDDVc4llAlzGGDijNXTVdV8JsI2tPqoFAzF8KB-Q");
    const [markerdata, setMarkerData] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            const markers = await Promise.all([
                fetchMarker(),
            ]);
            console.log(markerdata)
        }
        fetchData()
    },[]);
  
    const fetchMarker = () => {
        return fetch("http://localhost:3150/api/all", {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          })
          .then(response => response.json())
          .then(res=>{
                setMarkerData(res.data)
                return res
            })
          .catch(error => console.log('error', error));
    }

    // const TileURL = "./map/{z}/{x}/{y}.jpg";
    const TileURL = "https://imgs.ali213.net/picfile/eldenring/{z}/{x}/{y}.jpg";
    return (
        <div className='AppContainer'>
            <MapContainer center={[0, 0]} zoom={4} scrollWheelZoom={false} maxBounds={[[-300,-300],[300,300]]} preferCanvas={true} >
                <TileLayer
                    className="basemap"
                    attribution='&copy;hihihi'
                    maxZoom={4}
                    minZoom={2}
                    tileSize={200}
                    zoomOffset={0}
                    url={TileURL}
                />

                {markerdata.map(marker=>(
                    <Marker 
                        position={[marker.lat,marker.lng]} 
                        key={marker.id} 
                    >
                        <Popup>
                            <div>{marker.name}</div>
                        </Popup>
                    </Marker>
                ))}


                <Control position='topright'>
                    <Button color='inherit'>
                        <SearchIcon />
                    </Button>
                </Control>
            </MapContainer>
        </div>
    );
}

export default App;

// url="https://imgs.ali213.net/picfile/eldenring/{z}/{x}/{y}.jpg"