import { Location } from '@domain/entities/Location';
import axios from 'axios';

export class GoogleMapsDataSource {
  private readonly apiKey: string;
  constructor() {
    this.apiKey = process.env.GOOGLE_API_KEY ?? '';
  }

  async geocodeAddress(address: string): Promise<Location> {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;

    try {
      const response = await axios.get(geocodeUrl);

      if (response.data.status !== 'OK') {
        throw new Error(`Geocoding failed: ${response.data.status}`);
      }

      const result = response.data.results[0];
      if (!result) {
        throw new Error('Address not found');
      }

      const location = result.geometry.location;
      return new Location({
        address: result.formatted_address,
        latitude: location.lat,
        longitude: location.lng,
      });
    } catch (error) {
      console.error('Geocoding Error:', error);
      throw new Error('Geocoding failed');
    }
  }

  async calculateRoute(origin: Location, destination: Location) {
    const routeUrl =
      'https://routes.googleapis.com/directions/v2:computeRoutes';
    try {
      const response = await axios.post(
        routeUrl,
        {
          origin: {
            location: {
              latLng: {
                latitude: origin.latitude,
                longitude: origin.longitude,
              },
            },
          },
          destination: {
            location: {
              latLng: {
                latitude: destination.latitude,
                longitude: destination.longitude,
              },
            },
          },
          travelMode: 'DRIVE',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-api-key': this.apiKey,
            'X-Goog-fieldMask':
              'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline',
          },
        },
      );
      const route = response.data.routes[0];
      if (!route) {
        throw new Error('No routes found');
      }

      const routeDetails = {
        distance: route.distanceMeters / 1000,
        duration: route.duration,
        polyline: route.polyline.encodedPolyline,
        originalResponse: response.data,
      };

      return routeDetails;
    } catch (error) {
      console.error('Google Maps Route Calculation Error', error);
      throw new Error('Route calculation failed');
    }
  }
}
