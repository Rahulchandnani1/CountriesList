import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import CSS file for styling
import CountryDetailPage from './CountryDetailPage';
import { useAppContext } from './AppContext';

const HomePage: React.FC = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>(''); // New state for selected region

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);
  const [isActive, setIsActive] = useState(false);
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredByRegion =
  selectedRegion === ''
    ? filteredCountries
    : filteredCountries.filter((country) => country.region.toLowerCase() === selectedRegion.toLowerCase());

  const toggleDiv = () => {
    setIsActive(!isActive);
  };
  console.log(isActive,"act")
  const { darkMode, toggleDarkMode } = useAppContext();

  return (
    <div className={`${darkMode? "container":"container1"}`}>
        <div className='navdiv'>
      <h2>Where in the world?</h2>
      <div className='togglediv'>
      <h2> Light</h2>
      <div className = 'toggle-switch'>
       
            <label>
                <input className='inp' type='checkbox' onChange={toggleDarkMode}/>
                <span className = 'slider'></span>
            </label>
           
        </div>
        <h2> Dark</h2></div>
      </div>
      <div className='searchandfilter'>
      <input
        type="text"
        className='searchinp'
        placeholder="Search for a country..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
          <option value="">Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="americas">Americas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <div className="card-container">
        {filteredByRegion.map((country) => (
            <Link to={`/country/${country.cca3}`} key={country.cca3} className="card-link">
          <div className="card" key={country.cca3}>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
            <h2>{country.name && country.name.common}</h2>
            <p>Population: <span>{country.population}</span></p>
            <p>Region: <span>{country.region}</span></p>
            <p>Capital: <span>{country.capital && country.capital[0]}</span></p>
            
          </div>
          </Link>
        ))}
      </div>
      
    </div>
  );
};

export default HomePage;
