"use client";

import React, { useState, useEffect } from "react";
import { useEstimateRide } from "../hooks/useRideEstimate";
import { Driver} from "@/domain/models/Driver";
import { useGenerateMapUrl } from "../hooks/useGenerateMapUrl";
import { useConfirmRide } from "../hooks/useConfirmRide";

type Coords = { latitude: number; longitude: number } | null;

export default function EstimateRideForm() {
    const [customerId, setCustomerId] = useState("");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const {estimateRide, isLoading, rideEstimate } = useEstimateRide();
    const [originCoords, setOriginCoords] = useState<Coords>(null);
    const [destinationCoords, setDestinationCoords] = useState<Coords>(null);
    const mapUrl = useGenerateMapUrl(process.env.NEXT_PUBLIC_GOOGLE_API_KEY, originCoords, destinationCoords);
    const { confirmRide} = useConfirmRide();

    const handleEstimate = async () => {
        if (customerId && origin && destination) {
            await estimateRide(customerId, origin, destination);
        } else {
            alert("Please fill in all fields.");
        }
    };

    const handleSelectDriver = async (driverId: number) => {
        const selectedDriver = rideEstimate?.options.find((driver: any) => driver.id === driverId);

        if (selectedDriver) {
            const rideDetails = {
                customer_id: customerId,
                origin: origin, 
                destination: destination, 
                driver: {
                    id: selectedDriver.id,
                    name: selectedDriver.name,
                },
                value: selectedDriver.value, 
            };
    
            try {
                await confirmRide(customerId, rideDetails as any);
            } catch (error) {
                console.error("Error confirming ride:", error);
            }
        } else {
            console.error("Driver not found");
        }
    };

    
    useEffect(() => {
        if (rideEstimate && rideEstimate.options) {
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


     
            {rideEstimate && rideEstimate.options && rideEstimate.options.length > 0 && (
    <div className="driver-cards-container">
        {rideEstimate.options.map((driverData: any) => {
            const driver = new Driver(driverData);
            return (
                <div key={driver.id} className="driver-card">
                    <h3>{driver.name}</h3>
                    <p>{driver.description}</p>
                    <p><strong>Vehicle:</strong> {driver.vehicle.toString()}</p>
                    <p><strong>Review:</strong> {driverData.reviews ? `Rating: ${driverData.reviews.rating}, Comment: ${driverData.reviews.comment}` : "No reviews available"}</p>
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
