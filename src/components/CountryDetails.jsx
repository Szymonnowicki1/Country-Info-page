import { useNavigate, useParams } from "react-router-dom";
import "./CountryDetails.css";
import { useState, useEffect } from "react";
import {ArrowLeft} from "lucide-react";
const CountryDetails = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data[0]) {
          setCountry(null);
          return;
        }

        const c = data[0];
        setCountry({
          flag: c.flags?.png,
          name: c.name?.common,
          population: c.population,
          region: c.region,
          subregion: c.subregion,
          capital: c.capital?.[0] || "N/A",
          currencies: c.currencies
            ? Object.keys(c.currencies).join(", ")
            : "N/A",
          languages: c.languages
            ? Object.values(c.languages).join(", ")
            : "N/A",
        });
      })
  }, [name]);

  if (!country) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
      </div>
    );
  }

  return (
    <div className="country-details-contener">
      <button className="back" onClick={() => navigate(-1)}>
        <ArrowLeft size={18}/>Back
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
                <div>Population: {country.population.toLocaleString()}</div>
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
