import React, { useState, useMemo } from "react";
import earthImg from '../../assets/earth.png';
import './Side.css';
import { useDispatch } from "react-redux";
import { fetchWeather } from "../../store/weatherSlice";
import type { AppDispatch } from "../../store/store";
import debounce from "lodash/debounce";

import type{ WeatherApiCity} from '../../api/types.ts'
const Side = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const dispatch = useDispatch<AppDispatch>();

    const debouncedFetch = useMemo(
        () =>
            debounce(async (value: string) => {
                if (!value) {
                    setSuggestions([]);
                    return;
                }

                const res = await fetch(
                    `https://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${value}`
                );
                const data = await res.json();
                const cities = (data as WeatherApiCity[]).slice(0, 5).map(item => item.name);
                setSuggestions(cities);
            }, 300),
        []
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        debouncedFetch(value);
    };

    const handleSelect = (city: string) => {
        setQuery(city);
        setSuggestions([]);
        dispatch(fetchWeather(city));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim() === "") return;
        dispatch(fetchWeather(query.trim()));
        setSuggestions([]);
        setQuery("");
    };

    return (
        <div className="side">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search city"
                    value={query}
                    onChange={handleChange}
                />
                {suggestions.length > 0 && (
                    <ul className="list">
                        {suggestions.map((city) => (
                            <li
                                key={city}
                                onClick={() => handleSelect(city)}
                                className="item"
                            >
                                {city}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
            <img src={earthImg} alt="Earth"/>
        </div>
    );
};

export default React.memo(Side);
