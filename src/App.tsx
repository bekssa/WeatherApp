import './App.css';
import Main from "./components/main/Main.tsx";
import Header from "./components/header/Header.tsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "./store/weatherSlice";
import type { AppDispatch, RootState } from "./store/store";
import sunny from './assets/sunny.jpg';
import rainy from './assets/rainy.jpg';
import snowy from './assets/snowy.jpg';
import cloudy from './assets/cloudy.jpg';
import mist from './assets/mist.jpg';


const App = () => {
    const dispatch = useDispatch<AppDispatch>();
    const current = useSelector((state: RootState) => state.weather.current);

    useEffect(() => {
        dispatch(fetchWeather("Almaty"));
    }, [dispatch]);

    const getBackground = (condition?: string) => {
        if (!condition) return "none";
        const c = condition.toLowerCase();
        if (c.includes("rain")) return `url(${rainy})`;
        else if (c.includes("cloud")) return `url(${cloudy})`;
        else if (c.includes("clear")) return `url(${sunny})`;
        else if (c.includes("snow")) return `url(${snowy})`;
        else if (c.includes("overcast")) return `url(${cloudy})`;
        else if (c.includes("mist")) return `url(${mist})`;
        return `url(${sunny})`;
    };

    const backgroundStyle = {
        backgroundImage: getBackground(current?.condition.text),
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "100%",
    };

    return (
        <div style={backgroundStyle}>
            <Header />
            <Main />
        </div>
    );
};

export default App;
