'use client';

import React, { useState } from 'react';
import { Ride } from '@/domain/models/Ride';
import { useGetRideHistory } from '../hooks/useGetRideHistory';

export function RideHistoryPage() {
  const [customerId, setCustomerId] = useState('');
  const [selectedDriverId, setSelectedDriverId] = useState<number | undefined>(undefined);
  const { rides, error, isLoading } = useGetRideHistory(customerId, selectedDriverId);

  const handleFilter = () => {
    // The hook will automatically fetch rides when customerId changes
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ride History</h1>
      
      <div className="flex mb-4 space-x-2">
        <input
          type="text"
          placeholder="Enter Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="border p-2 flex-grow"
        />
        
        <select 
          value={selectedDriverId ?? 'all'} 
          onChange={(e) => {
            const value = e.target.value;
            setSelectedDriverId(value === 'all' ? undefined : Number(value));
          }}
          className="border p-2"
        >
          <option value="all">All Drivers</option>
          <option value="1">Homer Simpson</option>
          <option value="2">Dominic Toretto</option>
          <option value="3">James Bond</option>
        </select>
        
        <button 
          onClick={handleFilter}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Apply Filter
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {isLoading ? (
        <div>Loading...</div>
      ) : rides.length === 0 ? (
        <div>No rides found</div>
      ) : (
        <div className="grid gap-4">
          {rides.map((ride: Ride) => (
            <div 
              key={ride.id} 
              className="border p-4 rounded shadow-md"
            >
              <div className="flex justify-between">
                <div>
                  <p><strong>Date:</strong> {new Date(ride.date).toLocaleString()}</p>
                  <p><strong>Driver:</strong> {ride.driver.name}</p>
                  <p><strong>Route:</strong> {ride.origin.address} → {ride.destination.address}</p>
                </div>
                <div className="text-right">
                  <p><strong>Distance:</strong> {ride.distance} km</p>
                  <p><strong>Duration:</strong> {ride.duration}</p>
                  <p><strong>Value:</strong> R$ {ride.value.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RideHistoryPage;