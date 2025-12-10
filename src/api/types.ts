interface Location {
    name: string;
    region: string;
    country: string;
    localtime: string;
}
interface CurrentWeather {
    temp_c: number;
    condition: {
        text: string;
        icon: string;
    };
    wind_kph: number;
    humidity: number;
}
interface ForecastDay {
    date: string;
    day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
            text: string;
            icon: string;
        };
        wind_kph: number;
        humidity: number;
    };
}
export interface WeatherState {
    location: Location | null;
    current: CurrentWeather | null;
    forecast: ForecastDay[];
    status: "idle" | "loading" | "failed";
}

export interface WeatherApiResponse {
    location: {
        name: string;
        region: string;
        country: string;
        localtime: string;
    };
    current: {
        temp_c: number;
        condition: { text: string; icon: string };
        wind_kph: number;
        humidity: number;
    };
    forecast: {
        forecastday: ForecastDay[];
    };
}

export interface WeatherApiCity {
    id: number;
    name: string;
    region: string;
    country: string;
};