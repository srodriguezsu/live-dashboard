import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';
import {Box, Button, Icon, Stack, Typography} from "@mui/material";

// Connect to your WebSocket server
const socket = io('https://telemetria-server.onrender.com');

// Define a custom icon for the marker (optional)
const customIcon = new L.Icon({
    iconUrl: 'https://cdn.icon-icons.com/icons2/2248/PNG/512/go_kart_icon_136543.png',
    iconSize: [38, 38],
});

const LiveView = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [currentPosition, setCurrentPosition] = useState();
    const [positions, setPositions] = useState([]); // Array to store GPS positions
    const [recordings, setRecordings] = useState(() => {
        // Get recordings from localStorage or initialize to an empty array
        const savedRecordings = localStorage.getItem("recordings");
        return savedRecordings ? JSON.parse(savedRecordings) : [];
    });

    useEffect(() => {
        if (!isRecording && positions.length > 0) {
            const newRecordings = [...recordings, positions];
            setRecordings(newRecordings);
            localStorage.setItem('recordings', JSON.stringify(newRecordings));

            setPositions([]); // Clear positions after saving
        }

        // Listen for 'gpsData' event from the server
        socket.on('gpsData', (data) => {
            setCurrentPosition({ lat: data.lat, lng: data.lng, speed: data.speed });

            // Update the positions state with the new data
            if (isRecording) {
                setPositions((prevPositions) => [
                    { time: new Date(), lat: data.lat, lng: data.lng, speed: data.speed },
                    ...prevPositions,
                ]);
            }
        });

        return () => {
            socket.off('gpsData');
        };
    }, [isRecording, positions, recordings]);

    return (
        <Stack sx={{alignItems:'center', gap:'40px'}}>
            <Typography variant="h1">GPS Tracker</Typography>
            <Button variant="contained" onClick={() => setIsRecording(!isRecording)} startIcon={<Icon> {isRecording ? 'radio_button_checked' : "radio_button_unchecked"} </Icon> }>
                {isRecording ? 'Detener Grabación' : 'Iniciar Grabación'}
            </Button>

            {currentPosition ? (
                <>
                    <Typography variant="h3">Velocidad: {currentPosition?.speed} km/h</Typography>
                    <MapContainer
                        center={currentPosition} // Center the map on the first position
                        zoom={13}
                        style={{ height: '500px', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {/* Place a marker at the latest GPS position */}
                        <Marker position={currentPosition} icon={customIcon}></Marker>

                        {/* Draw a polyline to recreate the track */}
                        <Polyline positions={positions.map(pos => [pos.lat, pos.lng])} color="blue" />
                    </MapContainer>
                </>

            ) : (
                <>
                    <Typography variant="h3">No hay ubicación disponible.</Typography>
                    <Box sx={{
                        minHeight:'500px',
                    }}>
                        <Icon sx={{
                            fontSize:"300px"
                        }}>
                            wifi_tethering_off
                        </Icon>
                    </Box>
                </>

            )}


        </Stack>
    );
};

export default LiveView;