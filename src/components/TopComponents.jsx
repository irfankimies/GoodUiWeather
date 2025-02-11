import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { SlLocationPin } from "react-icons/sl";
import { GlobalContext } from "../context";
import { Country, State, City } from "country-state-city";

const TopComponents = () => {
  const {
    searchInput,
    setSearchInput,
    handleClickSearch,
    setCascadingData,
    namePlace,

  } = useContext(GlobalContext);

  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  //store all country data
  useEffect(() => {
    const countryData = Country.getAllCountries();
    setCountry(countryData);
  });
  //store all state data
  useEffect(() => {
    if (selectedCountry) {
      const stateData = State.getStatesOfCountry(selectedCountry);
      setState(stateData);
    }
  }, [selectedCountry]);

  // store all city data
  useEffect(() => {
    if (selectedCountry && selectedState) {
      const cityData = City.getCitiesOfState(selectedCountry, selectedState);
      setCity(cityData);
    }
  }, [selectedCountry, selectedState]);

// get latitude and longitude of selected country
useEffect(() =>{
  if(selectedCountry){
    const countryDetail = country.find((item) => item.isoCode === selectedCountry);

    setCascadingData({
      latitude: countryDetail.latitude,
      longitude: countryDetail.longitude,
      name: countryDetail.name
    })
 
  }
}, [selectedCountry])

// get latitude and longitude of selected country
useEffect(() => {
  if (selectedState) {
    const stateDetail = state.find((item) => item.isoCode === selectedState);

    setCascadingData({
      latitude: stateDetail.latitude,
      longitude: stateDetail.longitude,
      name: stateDetail.name
    })

  }
}, [selectedState]);

// get latitude and longitude of selected city
useEffect(() => {
  if (selectedCity){
    const cityDetail = city.find((item) => item.name == selectedCity)
    setCascadingData({
      latitude: cityDetail.latitude,
      longitude: cityDetail.longitude,
      name: cityDetail.name
    })
  }
}, [selectedCity]);


  return (
    <div className="flex items-center justify-between flex-row max-sm:flex-col max-sm:gap-5">
      {/* right side */}
      <div className="flex flex-row gap-10 max-sm:justify-between w-full">
        <p className="font-semibold uppercase text-xl ">Axios</p>

        {/* Current place */}
        <div className="flex flex-row gap-4 items-center text-md font-medium">
          <div>
            <SlLocationPin />
          </div>
          <p>
            <span className="text-gray-700/70">Weather in </span>{" "}
            <span className="font-bold text-black/70">{namePlace}</span>
          </p>
        </div>
      </div>

      {/* left side */}
      <div className="flex flex-row gap-5">
        {/* cascading dropdown */}
        <div className="flex flex-row items-center gap-1 text-gray-700 text-sm max-lg:hidden">
          {/* cascading dropdown country */}
          <select
            className="px-6 py-2 cursor-pointer max-w-38 text-black/60 font-semibold"
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setSelectedState("");
              setSelectedCity("");
              setSearchInput("");
            }}
            value={selectedCountry}
          >
            <option value="">Country</option>
            {country.map((item) => (
              <option key={item.isoCode} value={item.isoCode}>
                {item.name}
              </option>
            ))}
          </select>

          {/* cascading dropdown state */}
          <select
            className="px-6 py-2 max-w-38 text-black/60 font-semibold"
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity("");
            }}
            value={selectedState}
            disabled={!selectedCountry}
          >
            <option value="">State</option>
            {state.map((item) => (
              <option key={item.isoCode} value={item.isoCode}>
                {item.name}
              </option>
            ))}
          </select>
          {/* cascading dropdown city */}
          <select
            className="px-6 py-2 max-w-38 text-black/60 font-semibold"
            onChange={(e) => {
              setSelectedCity(e.target.value);
            }}
            value={selectedCity}
            disabled={!selectedState}
          >
            <option value="">City</option>
            {city.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* search input */}
        <div className="flex items-center flex-row gap-5 text-black/60">
          <input
            type="text"
            placeholder="Search your place"
            className="px-5 py-1.5  outline-none border border-transparent rounded-md focus:border focus:border-gray-600"
            onChange={(e) => {
              let inputValue = e.target.value.replace(/[0-9]/g, ""); // Remove numbers
              // Capitalize each word
              inputValue = inputValue
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

              setSearchInput(inputValue);

              if (e.target.value !== "") {
                setSelectedCountry("");
                setSelectedState("");
                setSelectedCity("");
              }
            }}
            value={searchInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClickSearch();
              }
            }}
          />
          <div className="text-2xl cursor-pointer ">
            <CiSearch onClick={() => handleClickSearch()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopComponents;
