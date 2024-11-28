import { Coords, GenerateMapUrlUseCase } from "@/domain/usecases/GenerateMapUrlUseCase";
import { useState, useEffect } from "react";

export const useGenerateMapUrl = (apiKey: string | undefined, originCoords: Coords | null, destinationCoords: Coords | null) => {
    const [mapUrl, setMapUrl] = useState<string>("");

    useEffect(() => {
        if (apiKey && originCoords && destinationCoords) {
            const mapUrlUseCase = new GenerateMapUrlUseCase(apiKey);
            const url = mapUrlUseCase.execute(originCoords, destinationCoords);
            setMapUrl(url);
        } else {
            setMapUrl("");
        }
    }, [apiKey, originCoords, destinationCoords]);

    return mapUrl;
};
