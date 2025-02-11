import React, { useContext, useEffect, useState } from "react";
import { TiWeatherShower } from "react-icons/ti";
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { GlobalContext } from "../context";

const BottonComponents = () => {
  const {
    dailyWeather,
    loading,
    getWeatherDescription,
    getWeatherIconDaily,
  } = useContext(GlobalContext);

  const [dailyData, setDailyData] = useState([]);
  const [filterType, setFilterType] = useState('')

  useEffect(() => {
    if (!loading && dailyWeather) {
      const weatherWithDay = dailyWeather.map((item, index) => {
        const date = new Date(item.date);
        const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
        const formattedDate = date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
        });
        return { ...item, dayOfWeek, formattedDate };
      });
      setDailyData(weatherWithDay);
    }
  }, [loading, dailyWeather]);

  let filteredWeather = [];
  if (filterType === "-14") {
    filteredWeather = dailyData.slice(0, 14);
  } else if (filterType === "+14") {
    filteredWeather = dailyData.slice(14);
  } else {
    filteredWeather = dailyData;
  }

  return (
    <div className="mt-10 max-md:w-[350px]">
      <div className=" text-white/50  flex flex-row gap-3 mb-1 ">
        <h1
          onClick={() => setFilterType("-14")}
          className={`cursor-pointer ${
            filterType === "-14" ? "text-amber-200" : ""
          } `}
        >
          14 days (past)
        </h1>
        <h1>|</h1>
        <h1
          onClick={() => setFilterType("+14")}
          className={`cursor-pointer ${
            filterType === "+14" ? "text-amber-200" : ""
          } `}
        >
          14 days (forecast)
        </h1>
        <h1>|</h1>
        <h1
          onClick={() => setFilterType("")}
          className={`cursor-pointer ${
            filterType === "" ? "text-amber-200" : ""
          } `}
        >
          ALL
        </h1>
      </div>
      <hr className="border-2 text-white/50" />

      {/* Bottom weather weekly forecast 1day gap */}
      <div className="text-white mt-5 flex flex-row items-center">
        {loading ? (
          <div className="w-full flex items-center justify-center">
            Loading...
          </div>
        ) : (
          <Swiper
            slidesPerView={6}
            spaceBetween={5}
            freeMode={true}
            modules={[FreeMode]}
            breakpoints={{
              330: { slidesPerView: 3 },
              480: { slidesPerView: 3 }, // For slightly larger screens
              768: { slidesPerView: 4 }, // Tablets
              1024: { slidesPerView: 6 }, // Desktops
              1440: { slidesPerView: 7 }, // Desktops
            }}
            className="mySwiper w-full max-md:w-[400px]"
          >
            {filteredWeather.map((day, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col  items-start">
                  <h1 className="uppercase">{day.dayOfWeek}</h1>
                  <h1 className="text-xs text-white/50">{day.formattedDate}</h1>

                  <p className="text-xs text-white/50 mt-2">
                    min: <span className="text-white">{day.temp_min}°</span>{" "}
                  </p>
                  <p className="text-xs text-white/50">
                    max: <span className="text-white">{day.temp_max}°</span>{" "}
                  </p>

                  <div className="text-4xl">
                    {getWeatherIconDaily(day.weather_code)}
                  </div>
                  <p className="text-xs text-white/50">
                    {getWeatherDescription(day.weather_code)}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default BottonComponents;
