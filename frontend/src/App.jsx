import React, {useEffect, useState} from 'react';

import { MapContainer, TileLayer, useMap, Marker, Popup, AttributionControl } from 'react-leaflet'
import Control from 'react-leaflet-custom-control'
import './App.css';

import Map from './components/map.container';

// import CanvasMarkersLayer from 'react-leaflet-canvas-markers'

function App() {

    return (
        <div className='AppContainer'>
            <Map/>
        </div>
    );
}

export default App;

// url="https://imgs.ali213.net/picfile/eldenring/{z}/{x}/{y}.jpg"