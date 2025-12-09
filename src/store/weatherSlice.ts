import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import {type WeatherState,type WeatherApiResponse} from "../api/types.ts";


const initialState: WeatherState = {
    location: null,
    current: null,
    forecast: [],
    status: "idle",
};

export const fetchWeather = createAsyncThunk<WeatherApiResponse,string>(
    "weather/fetch",
    async(city: string) => {
        const res = await fetch(  `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&days=7&aqi=no&alerts=no`);
        return res.json();
    }
);

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<WeatherApiResponse>) => {
                state.status = "idle";
                state.location = action.payload.location;
                state.current = action.payload.current;
                state.forecast = action.payload.forecast.forecastday;
            })
            .addCase(fetchWeather.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default weatherSlice.reducer;