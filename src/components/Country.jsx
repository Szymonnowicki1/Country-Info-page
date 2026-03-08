import "./Country.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Country = ({searchTerm, selectedRegion}) => {
        const [countries,setCountries] =useState([]);

        useEffect(()=>{
                fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital")
                .then((res) => res.json())
                .then((data) => {
                const mapData = data.map((country)=>({
                        flag: country.flags?.svg,
                        name:country.name?.common,
                        population:country.population,
                        region:country.region,
                        capital:country.capital?.[0] || "N/A",
                }))
                mapData.sort((a,b) => a.name.localeCompare(b.name));
                setCountries(mapData);
                })
                .catch((err) =>{
                        console.log(err)
                })
        },[])
          const filteredCountries = countries
    .filter((c) =>
      selectedRegion === "All" ? true : c.region === selectedRegion
    )
    .filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    );

    return(
        <div className="country-contener">
            {filteredCountries.map((country,index) => (
                <Link to={`/country/${country.name}`} className="country-border" key={index}>
                    <img src={country.flag} style={{ width: "100%", height: "42%",     objectFit: "cover"}}/>
                    <div className="name">{country.name}</div>
                    <div className="population"><span>Population:</span> {country.population.toLocaleString()}</div>
                    <div className="region"><span>Region:</span> {country.region}</div>
                    <div className="capital"><span>Capital:</span> {country.capital}</div>
                </Link>
            ))}
        </div>
    )
}

export default Country;