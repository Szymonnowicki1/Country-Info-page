
import { useNavigate, useParams } from "react-router-dom";
import "./CountryDetails.css";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const CountryDetails = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const navigate = useNavigate();

  
useEffect(() => {
  setCountry(null);

  fetch("https://countries.dev/countries?fields=name,flags,flag,population,region,subregion,capital,currencies,languages")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch countries");
      }
      return res.json();
    })
    .then((data) => {
      const c = data.find(
        (item) => item.name.toLowerCase() === decodeURIComponent(name).toLowerCase()
      );

      if (!c) {
        setCountry(null);
        return;
      }

      setCountry({
        flag: c.flags?.png || c.flags?.svg || c.flag,
        name: c.name,
        population: c.population ?? 0,
        region: c.region || "N/A",
        subregion: c.subregion || "N/A",
        capital: Array.isArray(c.capital)
          ? c.capital[0] || "N/A"
          : c.capital || "N/A",
        currencies: Array.isArray(c.currencies)
          ? c.currencies.map((item) => item.name || item.code).join(", ")
          : c.currencies
            ? Object.keys(c.currencies).join(", ")
            : "N/A",
        languages: Array.isArray(c.languages)
          ? c.languages.map((item) => item.name || item).join(", ")
          : c.languages
            ? Object.values(c.languages).join(", ")
            : "N/A",
      });
    })
    .catch((err) => {
      console.error("Error fetching country:", err);
      setCountry(null);
    });
}, [name]);


  if (!country) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="country-details-contener">
      <button className="back" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="country-details">
        <div className="flag">
          <img
            className="flag"
            src={country.flag}
            style={{ width: "75%", height: "100%" }}
            alt={country.name}
          />
        </div>

        <div className="details">
          <div className="column">
            <div className="title">Name: {country.name}</div>
            <div>
              Population: {country.population.toLocaleString()}
            </div>
            <div>Region: {country.region}</div>
            <div>Sub Region: {country.subregion}</div>
          </div>

          <div className="column">
            <div>Capital: {country.capital}</div>
            <div>Currencies: {country.currencies}</div>
            <div>Languages: {country.languages}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
