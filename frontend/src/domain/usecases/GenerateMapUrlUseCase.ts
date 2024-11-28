export interface Coords {
    latitude: number;
    longitude: number;
}

export class GenerateMapUrlUseCase {
    constructor(private readonly apiKey: string) { }

    execute(originCoords: Coords, destinationCoords: Coords): string {
        if (!this.apiKey) {
            console.error("Google API key is missing.");
            return '';
        }
        return `https://www.google.com/maps/embed/v1/directions?key=${this.apiKey}&origin=${originCoords.latitude},${originCoords.longitude}&destination=${destinationCoords.latitude},${destinationCoords.longitude}&mode=driving`;
    }
}
