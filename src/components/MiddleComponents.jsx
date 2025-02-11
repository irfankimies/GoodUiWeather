import React, { useContext, useState } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { GlobalContext } from "../context";
import TimeDisplay from "../context/TimeDisplay";

const MiddleComponents = () => {
  const {
    currentWeather,
    hourlyWeather,
    dailyWeather,
    getWeatherIcon,
    getWeatherIconCurrent,
    getWeatherDescription,
    loading,
  } = useContext(GlobalContext);

  const [interval, setInterval] = useState(1);

  const filteredWeather = hourlyWeather.filter(
    (_, index) => index % interval === 0
  );

  return (
    <div className="pl-5 pr-5 text-white font-roboto flex flex-row max-md:flex-col max-lg:gap-5 max-lg:items-center justify-between">
      {loading ? (
        <div className="w-full flex items-center justify-center">
          Loading...
        </div>
      ) : (
        // left side
        <div className="flex flex-row items-end gap-5 lg:gap-10 ">
          <div className="flex flex-col items-center">
            {getWeatherIconCurrent(currentWeather)}
            <div className="opacity-70 text-xs">
              <h1>Sunrise: {dailyWeather[14].sunrise}</h1>
              <h1>Sunset: {dailyWeather[14].sunset}</h1>
              <h1 className="font-bold text-amber-200 mt-2">Timezone:</h1>
              <h1>{currentWeather.timezone}</h1>
            </div>
          </div>
          {/* current temp */}
          <div className="flex flex-col">
            <h1 className="text-lg">
              {currentWeather.date} |{" "}
              <TimeDisplay timezone={currentWeather.timezone} />
            </h1>
            <h1 className="text-5xl mb-2 text-yellow-300 ">
              {currentWeather.temperature}°C
            </h1>

            <h1 className="opacity-50 text-sm w-30">
              The weather data will be updated every 15 minutes.
            </h1>
          </div>
          {/* moreDetail */}
          <div className="flex flex-col mr-10 w-30">
            <h1 className="text-xs mb-5 uppercase">More Details</h1>
            <div className="flex flex-col gap-2 text-xs">
              <p>
                <span className="opacity-50">Wind speed:</span>
                {currentWeather.wind_speed}m/s
              </p>
              <p>
                <span className="opacity-50">Air humidity:</span>{" "}
                {currentWeather.humidity}%
              </p>
              <p>
                <span className="opacity-50">Pressure:</span>{" "}
                {currentWeather.pressure} mm
              </p>
              <p>
                <span className="opacity-50">Precipition:</span>{" "}
                {currentWeather.precipitation}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* box for daily weather right side */}
      <div className="bg-black/15 backdrop-blur-xs px-5 pb-7 pt-5 rounded-md w-[350px] sm:w-[400px] md:w-[500px] lg:w-[550px] xl:w-[600px] 2xl:w-[800px]">
        <div className="mb-5 flex flex-row justify-between">
          <h1 className="opacity-80">Today/Forecast</h1>

          <div className="flex flex-row gap-7 max-md:gap-3">
            <span
              onClick={() => setInterval(1)}
              className={` opacity-80 cursor-pointer ${
                interval === 1 ? "text-amber-200" : ""
              }`}
            >
              1/Hour
            </span>
            <span
              onClick={() => setInterval(3)}
              className={`opacity-80 cursor-pointer ${
                interval === 3 ? "text-amber-200" : ""
              }`}
            >
              3/Hour
            </span>
            <span
              onClick={() => setInterval(6)}
              className={`opacity-80 cursor-pointer ${
                interval === 6 ? "text-amber-200" : ""
              }`}
            >
              6/Hour
            </span>
          </div>
        </div>

        {/* daily forecast */}

        <Swiper
          slidesPerView={5}
          spaceBetween={0}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            330: { slidesPerView: 3 },
            480: { slidesPerView: 3 }, // For slightly larger screens
            768: { slidesPerView: 4 }, // Tablets
            1024: { slidesPerView: 5 }, // Desktops
            1280: { slidesPerView: 6 }, // Desktops
            1440: { slidesPerView: 7 }, // Desktops
            // Desktops
          }}
          className="mySwiper"
        >
          {loading ? (
            <div>Loading...</div>
          ) : (
            filteredWeather.map((hour, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center gap-2">
                  <p className="opacity-50 text-xs">{hour.time}</p>
                  {getWeatherIcon(hour)}
                  <p className="text-xl">{hour.temperature}°</p>
                  <p className="opacity-50 text-xs">
                    {getWeatherDescription(hour.weather_code)}
                  </p>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default MiddleComponents;
