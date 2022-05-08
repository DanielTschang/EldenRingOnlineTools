import React, {useEffect, useState} from 'react';

import { MapContainer, TileLayer, useMap, Marker, Popup, AttributionControl } from 'react-leaflet'
import Control from 'react-leaflet-custom-control'
import './App.css';
import { Button } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import MapContent from './components/map';
import { Button } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

// import CanvasMarkersLayer from 'react-leaflet-canvas-markers'

function Map() {
    
    return (
        <div id="map"></div>
    );
}

export default Map;

// url="https://imgs.ali213.net/picfile/eldenring/{z}/{x}/{y}.jpg"