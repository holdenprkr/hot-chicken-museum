import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl'
import Settings from '../data/Settings'

function Map() {
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 36.137698356986476,
        longitude: -86.7755126953125,
        zoom: 9
    })

    return (
        <>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={Settings.map_token}
                onViewportChange={(viewport) => setViewport(viewport)}
            >

            </ReactMapGL>
        </>
    );
}

export default Map;