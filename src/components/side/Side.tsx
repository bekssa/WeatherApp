import React, { useState } from "react";
import earthImg from '../../assets/earth.png';
import './Side.css';
import { useDispatch } from "react-redux";
import { fetchWeather } from "../../store/weatherSlice";
import type { AppDispatch } from "../../store/store";

const Side = () => {
    const [city, setCity] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (city.trim() === "") return;
        dispatch(fetchWeather(city.trim()));
        setCity(""); // очищаем поле после поиска
    };

    return (
        <div className="side">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </form>
            <img src={earthImg} alt="Earth"/>
        </div>
    );
};

export default Side;
