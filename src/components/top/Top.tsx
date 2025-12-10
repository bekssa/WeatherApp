import { useSelector } from "react-redux";
import {memo} from "react";
import {type RootState } from "../../store/store.ts";
import './Top.css'
const Top = () => {
    const current = useSelector((state: RootState) => state.weather.current);
    const location = useSelector((state: RootState) => state.weather.location);

    if (!current || !location) return <div>Loading...</div>;

    const regionPart = location.region ? `, ${location.region}` : "";
    return (
        <div>
            <h2>{location.name}{regionPart}, {location.country}</h2>
            <div>
            <p>{current.temp_c}°C</p>
            <p>{current.condition.text}</p>
            <p>Wind: {current.wind_kph} kph</p>
            <p>Humidity: {current.humidity}%</p>
            </div>
        </div>
    );
};

export default memo(Top);
