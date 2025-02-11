import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [currentWeather, setCurrentWeather] = useState([]);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState("");

  const [cascadingData, setCascadingData] = useState({
    latitude: "48.8575",
    longitude: "2.3514",
    name: "Paris",
  });

  const [namePlace, setNamePlace] = useState(cascadingData.name);

  const handleClickSearch = () => {
    if (searchInput) {
      placeHolderSearch(searchInput).then((location) => {
        setCascadingData(location);
        CascadingSearch(location);
        setNamePlace(searchInput);
      });
    }

    CascadingSearch(cascadingData);
    setNamePlace(cascadingData.name);
  };



  const getWeatherIcon = (hour) => {
    if (!hour) return null;

    const isDay = hour.isDayTime ?? false;
    const dayNight = (day, night) => (isDay ? day : night);

    const weatherGroups = {
      clear: [0],
      partlyCloudy: [1],
      cloudy: [2],
      overcast: [3],
      fog: [45],
      haze: [48],
      drizzle: [51],
      rain: [53, 55, 61, 63, 65, 81, 82],
      freezingRain: [56, 57, 66, 67],
      snow: [71, 73, 75, 85, 86],
      snowflake: [77],
      partlyCloudyRain: [80],
      thunderstorms: [95],
      thunderstormsRain: [96, 99],
    };

    const iconMap = {
      clear: dayNight("clear-day.svg", "clear-night.svg"),
      partlyCloudy: dayNight(
        "partly-cloudy-day.svg",
        "partly-cloudy-night.svg"
      ),
      cloudy: "cloudy.svg",
      overcast: "overcast.svg",
      fog: dayNight("fog-day.svg", "fog-night.svg"),
      haze: dayNight("haze-day.svg", "haze-night.svg"),
      drizzle: "drizzle.svg",
      rain: "rain.svg",
      freezingRain: "freezing-rain.svg",
      snow: "snow.svg",
      snowflake: "snowflake.svg",
      partlyCloudyRain: dayNight(
        "partly-cloudy-day-rain.svg",
        "partly-cloudy-night-rain.svg"
      ),
      thunderstorms: dayNight(
        "thunderstorms-day.svg",
        "thunderstorms-night.svg"
      ),
      thunderstormsRain: dayNight(
        "thunderstorms-day-rain.svg",
        "thunderstorms-night-rain.svg"
      ),
    };

    const icon = Object.entries(weatherGroups).find(([_, codes]) =>
      codes.includes(hour.weather_code)
    )?.[0];

    return (
      <img
        src={`/weather_icon/${iconMap[icon] || "not-available.svg"}`}
        className="w-[60px]"
        alt="Weather Icon"
      />
    );
  };

  const getWeatherIconCurrent = (hour) => {
    if (!hour) return null;

    const isDay = hour.isDayTime ?? false;
    const dayNight = (day, night) => (isDay ? day : night);

    const weatherGroups = {
      clear: [0],
      partlyCloudy: [1],
      cloudy: [2],
      overcast: [3],
      fog: [45],
      haze: [48],
      drizzle: [51],
      rain: [53, 55, 61, 63, 65, 81, 82],
      freezingRain: [56, 57, 66, 67],
      snow: [71, 73, 75, 85, 86],
      snowflake: [77],
      partlyCloudyRain: [80],
      thunderstorms: [95],
      thunderstormsRain: [96, 99],
    };

    const iconMap = {
      clear: dayNight("clear-day.svg", "clear-night.svg"),
      partlyCloudy: dayNight(
        "partly-cloudy-day.svg",
        "partly-cloudy-night.svg"
      ),
      cloudy: "cloudy.svg",
      overcast: "overcast.svg",
      fog: dayNight("fog-day.svg", "fog-night.svg"),
      haze: dayNight("haze-day.svg", "haze-night.svg"),
      drizzle: "drizzle.svg",
      rain: "rain.svg",
      freezingRain: "freezing-rain.svg",
      snow: "snow.svg",
      snowflake: "snowflake.svg",
      partlyCloudyRain: dayNight(
        "partly-cloudy-day-rain.svg",
        "partly-cloudy-night-rain.svg"
      ),
      thunderstorms: dayNight(
        "thunderstorms-day.svg",
        "thunderstorms-night.svg"
      ),
      thunderstormsRain: dayNight(
        "thunderstorms-day-rain.svg",
        "thunderstorms-night-rain.svg"
      ),
    };

    const icon = Object.entries(weatherGroups).find(([_, codes]) =>
      codes.includes(hour.weather_code)
    )?.[0];

    return (
      <img
        src={`/weather_icon/${iconMap[icon] || "not-available.svg"}`}
        className="min-w-[100px]"
        alt="Weather Icon"
      />
    );
  };


  const getWeatherIconDaily = (weatherCode) => {
    const weatherIcons = {
      0: "clear-day.svg",
      1: "partly-cloudy-day.svg",
      2: "cloudy.svg",
      3: "overcast.svg",
      45: "fog-day.svg",
      48: "haze-day.svg",
      51: "drizzle.svg",
      53: "rain.svg",
      55: "rain.svg",
      56: "sleet.svg",
      57: "sleet.svg",
      61: "rain.svg",
      63: "rain.svg",
      65: "rain.svg",
      66: "sleet.svg",
      67: "sleet.svg",
      71: "snow.svg",
      73: "snow.svg",
      75: "snow.svg",
      77: "snowflake.svg",
      80: "partly-cloudy-day-rain.svg",
      81: "rain.svg",
      82: "rain.svg",
      85: "snow.svg",
      86: "snow.svg",
      95: "thunderstorms-day.svg",
      96: "thunderstorms-day-rain.svg",
      99: "thunderstorms-day-rain.svg",
    };

    return (
      <img
        src={`/weather_icon/${
          weatherIcons[weatherCode] || "not-available.svg"
        }`}
        className="w-[80px]"
        alt="Weather Icon"
      />
    );
  };

  const getWeatherDescription = (weatherCode) => {
    if (weatherCode === 0) return "Clear day";
    if (weatherCode === 1) return "Mainly clear";
    if (weatherCode === 2) return "Partly cloudy";
    if (weatherCode === 3) return "Overcast";
    if ([45, 48].includes(weatherCode)) return "Foggy";
    if ([51, 53, 55].includes(weatherCode)) return "Drizzle";
    if ([61, 63, 65, 80, 81, 82].includes(weatherCode)) return "Rainy";
    if ([66, 67, 71, 73, 75, 85, 86, 77].includes(weatherCode)) return "Snowy";
    if ([95, 96, 99].includes(weatherCode)) return "Thunderstorm";
    return "Unknown weather condition";
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date, timezone) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
      timeZone: timezone,
    }).format(new Date(date));
  };

  // weather data
  const placeHolderSearch = async (searchInput) => {
    const URL = `https://geocoding-api.open-meteo.com/v1/search?name=${searchInput}&count=1`;
    try {
      const res = await fetch(URL);
      const data = await res.json();
      const location = {
        latitude: data.results[0].latitude,
        longitude: data.results[0].longitude,
      };
      console.log("location handle", location);
      return location;
    } catch (e) {
      console.log(e);
    }
  };

  const CascadingSearch = async (location) => {
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,surface_pressure,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&wind_speed_unit=ms&past_days=14&forecast_days=14&timezone=auto`;

    try {
      setLoading(true);
      const res = await fetch(URL);
      const data = await res.json();


      // stored current data
      setCurrentWeather({
        isDayTime: isDayTime(formatTime(data.current.time)),
        timezone: data.timezone,
        date: formatDate(data.current.time, data.timezone),
        temperature: data.current.temperature_2m,
        pressure: data.current.surface_pressure,
        wind_speed: data.current.wind_speed_10m,
        humidity: data.current.relative_humidity_2m,
        precipitation: data.current.precipitation,
        weather_code: data.current.weather_code,
      });
      
      // store Daily data
      const structuredDailyData = data.daily.time.map((date, index) => ({
        date: date,
        temp_max: data.daily.temperature_2m_max[index],
        temp_min: data.daily.temperature_2m_min[index],
        sunrise: formatTime(data.daily.sunrise[index]),
        sunset: formatTime(data.daily.sunset[index]),
        weather_code: data.daily.weather_code[index],
      }));
      setDailyWeather(structuredDailyData);

      // store hourly data and only take today's data
      const todayDate = new Date().toISOString().split("T")[0];
      const filterTodayHourly = data.hourly.time
        .map((date) => ({ date }))
        .filter((item) => item.date.includes(todayDate));
  
      const structuredHourlyData = filterTodayHourly.map((date, index) => ({
        
        isDayTime: isDayTime(formatTime(date.date)),
        date: formatDate(date.date),
        time: formatTime(date.date),
        temperature: data.hourly.temperature_2m[index],
        weather_code: data.hourly.weather_code[index],
      }));

      setHourlyWeather(structuredHourlyData);
      setLoading(false);
    } catch (e) {
      console.error("Error fetching weather data:", e);
      setLoading(false);
    }
  };


    const isDayTime = (time) => {
      if (!dailyWeather || dailyWeather.length === 0) return true; // Assume day by default
    
      const sunset = dailyWeather[0]?.sunset || "18:00"; // Default sunset at 6 PM
      const sunrise = dailyWeather[0]?.sunrise || "06:00"; // Default sunrise at 6 AM
    
      const timeToMinutes = (t) => {
        const [hours, minutes] = t.split(":").map(Number);
        return hours * 60 + minutes;
      };
    
      const currentMinutes = timeToMinutes(time);
      const sunriseMinutes = timeToMinutes(sunrise);
      const sunsetMinutes = timeToMinutes(sunset);
    
      return currentMinutes >= sunriseMinutes && currentMinutes < sunsetMinutes;
    };
 


  useEffect(() => {
    CascadingSearch(cascadingData);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        getWeatherIconCurrent,
        currentWeather,
        hourlyWeather,
        dailyWeather,
        getWeatherIcon,
        loading,
        getWeatherDescription,
        searchInput,
        setSearchInput,
        handleClickSearch,
        setCascadingData,
        cascadingData,
        namePlace,
        setNamePlace,
        getWeatherIconDaily,
        time,
        setTime,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
