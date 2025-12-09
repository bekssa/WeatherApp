import { useSelector } from "react-redux";
import { type RootState } from "../../store/store.ts";
import "./Bottom.css";

export const Bottom = () => {
    const forecast = useSelector((state: RootState) => state.weather.forecast);
    const currentDate = new Date().toISOString().split("T")[0];


    if (!forecast.length) return <div>Loading...</div>;
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const sortedForecast = [...forecast].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        const getDayIndex = (date: Date) => {
            const jsDay = date.getDay(); // 0 = Sunday
            return jsDay === 0 ? 6 : jsDay - 1; // сдвигаем индекс, понедельник = 0
        };

        return getDayIndex(dateA) - getDayIndex(dateB);
    });

    return (
        <div className="weekly-forecast">
            {sortedForecast.map((day) => {
                const isToday = day.date === currentDate;
                const dateObj = new Date(day.date);
                const jsDay = dateObj.getDay();
                const dayIndex = jsDay === 0 ? 6 : jsDay - 1;
                const dayName = daysOfWeek[dayIndex];

                return (
                    <div
                        key={day.date}
                        className={`forecast-day ${isToday ? "today" : ""}`}
                    >
                        <p className="day-name">{dayName}</p>
                        <p className="day-date">{currentDate}</p>
                        <p className="condition">{day.day.condition.text}</p>
                        <p className="temp">{day.day.maxtemp_c}°C / {day.day.mintemp_c}°C</p>
                    </div>
                );
            })}
        </div>

    );
};

export default Bottom;
