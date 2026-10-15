
import "./Country.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Country = ({ searchTerm, selectedRegion }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(
  "https://countries.dev/countries?fields=name,flag,flags,population,region,capital"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch countries");
        }

        return res.json();
      })
      .then((data) => {
       const mapData = data.map((country) => ({
flag: country.flags?.svg || country.flags?.png || country.flag,
  name: country.name,
  population: country.population || 0,
  region: country.region,
  capital: country.capital || "N/A",
}));

        mapData.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(mapData);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
      });
  }, []);

  const filteredCountries = countries
    .filter((country) =>
      selectedRegion === "All"
        ? true
        : country.region === selectedRegion
    )
    .filter((country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="country-contener">
      {filteredCountries.map((country) => (
        <Link
          to={`/country/${encodeURIComponent(country.name)}`}
          className="country-border"
          key={country.name}
        >
          <img
            src={country.flag}
            alt={`Flag of ${country.name}`}
            style={{
              width: "100%",
              height: "42%",
              objectFit: "cover",
            }}
          />

          <div className="name">{country.name}</div>

          <div className="population">
            <span>Population:</span>{" "}
            {country.population.toLocaleString()}
          </div>

          <div className="region">
            <span>Region:</span> {country.region}
          </div>

          <div className="capital">
            <span>Capital:</span> {country.capital}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Country;
