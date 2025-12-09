export interface WeatherResponse {
    location: { name: string; region: string; country: string };
    current: { temp_c: number; condition: { text: string } };
}

export const getWeather = async (city: string): Promise<WeatherResponse> => {
    const url = import.meta.env.VITE_API_URL!;
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY!;
    const res = await fetch(`${url}?key=${apiKey}&q=${city}`);
    if (!res.ok) throw new Error("Failed to fetch weather");
    return res.json();
};
