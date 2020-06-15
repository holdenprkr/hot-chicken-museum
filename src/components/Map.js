import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import Settings from '../data/Settings'
import HotChickenData from '../data/database.json'
import './Map.css'

function Map() {
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '100vh',
        latitude: 36.1,
        longitude: -86.7755126953125,
        zoom: 10,
        maxBounds: [[26.137698356986476, -96.7755126953125], [46.137698356986476, -76.7755126953125]]
    });

    const [chosenMarker, setChosenMarker] = useState(null);

    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setChosenMarker(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        }
    }, []);

    return (
        <>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={Settings.map_token}
                onViewportChange={(viewport) => setViewport(viewport)}
            >
                {HotChickenData.businesses.map(restaurant => (
                    <Marker key={restaurant.id} latitude={restaurant.coordinates.latitude} longitude={restaurant.coordinates.longitude}>
                        <button
                            className="chicken-marker"
                            onClick={e => {
                                e.preventDefault();
                                setChosenMarker(restaurant);
                            }}>
                            <img src="/images/hotChickenIcon.png" alt="Chicken Icon" className="chicken-icon" />
                        </button>
                    </Marker>
                ))}

                {chosenMarker ? (
                    <Popup
                        className="chicken-popup"
                        latitude={chosenMarker.coordinates.latitude}
                        longitude={chosenMarker.coordinates.longitude}
                        onClose={() => setChosenMarker(null)}>
                        <h2>{chosenMarker.name}</h2>
                        <img src={chosenMarker.image_url} alt="" className="restaurant-image" />
                        <p className="restaurant-info">{chosenMarker.rating} ⭐</p>
                        <p className="restaurant-info">{chosenMarker.location.address1}</p>
                        <p className="restaurant-info">{chosenMarker.location.city}, {chosenMarker.location.state} {chosenMarker.location.zip_code}</p>
                        <p className="restaurant-info">{chosenMarker.display_phone}</p>
                    </Popup>
                ) : null}
            </ReactMapGL >
        </>
    );
}

export default Map;