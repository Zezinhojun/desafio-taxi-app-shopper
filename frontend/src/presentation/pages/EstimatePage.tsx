"use client";

import React, { useState, useEffect } from "react";
import { useEstimateRide } from "../hooks/useRideEstimate";
import { Driver } from "@/domain/models/Driver";
import { useGenerateMapUrl } from "../hooks/useGenerateMapUrl";

export default function EstimateRideForm() {
    const [customerId, setCustomerId] = useState("");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const { estimateRide, isLoading, rideEstimate } = useEstimateRide();
    const [originCoords, setOriginCoords] = useState<{ latitude: number, longitude: number } | null>(null);
    const [destinationCoords, setDestinationCoords] = useState<{ latitude: number, longitude: number } | null>(null);
    const mapUrl = useGenerateMapUrl(process.env.NEXT_PUBLIC_GOOGLE_API_KEY, originCoords, destinationCoords);

    const handleEstimate = async () => {
        if (customerId && origin && destination) {
            await estimateRide(customerId, origin, destination);
        } else {
            alert("Please fill in all fields.");
        }
    };

    useEffect(() => {
        if (rideEstimate && rideEstimate.options) {
            console.log(rideEstimate)
            // Atualiza as coordenadas de origem e destino com base no retorno da estimativa
            setOriginCoords({
                latitude: rideEstimate.origin.latitude,
                longitude: rideEstimate.origin.longitude,
            });
            setDestinationCoords({
                latitude: rideEstimate.destination.latitude,
                longitude: rideEstimate.destination.longitude,
            });
        }
    }, [rideEstimate]);
    return (
        <div>
            <h1>Estimate Your Ride</h1>
            <div>
                <label>
                    Customer ID:
                    <input
                        type="text"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Origin:
                    <input
                        type="text"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Destination:
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleEstimate} disabled={isLoading}>
                {isLoading ? "Estimating..." : "Estimate Ride"}
            </button>

            {originCoords && destinationCoords && mapUrl && (
                <div className="map-container">
                    <iframe
                        title="Google Maps Directions"
                        width="600"
                        height="400"
                        src={mapUrl}
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            )}


            {/* Lista de cards de motoristas */}
            {rideEstimate && rideEstimate.options && rideEstimate.options.length > 0 && (
    <div className="driver-cards-container">
        {rideEstimate.options.map((driverData : Driver) => {
            // Certifique-se de criar uma instância de Driver
            const driver = new Driver(driverData);
            return (
                <div key={driver.id} className="driver-card">
                    <h3>{driver.name}</h3>
                    <p>{driver.description}</p>
                    <p><strong>Vehicle:</strong> {driver.vehicle}</p>
                    <p><strong>Review:</strong> {driverData.review ? `Rating: ${driverData.review.rating}, Comment: ${driverData.review.comment}` : "No reviews available"}</p>
                    <p><strong>Value:</strong> R$ {driverData.value?.toFixed(2)}</p>
                    <button onClick={() => handleSelectDriver(driver.id)}>Choose</button>
                </div>
            );
        })}
    </div>
)}
        </div>
    );
}

// Função para lidar com a escolha do motorista
const handleSelectDriver = (driverId: number) => {
    console.log("Driver chosen:", driverId);
    // Adicione a lógica para confirmar a viagem e redirecionar, se necessário
};
