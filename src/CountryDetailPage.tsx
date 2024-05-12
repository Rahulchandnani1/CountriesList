import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./HomePage.css";
import { useAppContext } from './AppContext';

import arrow from "./call-made.svg";
import arrow1 from "./Shape.png";
const CountryDetailPage: React.FC = () => {
  const { countryCode } = useParams<{ countryCode: string }>();
  const [country, setCountry] = useState<any | null>(null);
  const [isActive, setIsActive] = useState(false);

  const toggleDiv = () => {
    setIsActive(!isActive);
  };
  const { darkMode, toggleDarkMode } = useAppContext();
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
      .then((response) => response.json())
      .then((data) => setCountry(data["0"]))
      .catch((error) => {
        console.error('Error fetching country data:', error);
      });
  }, [countryCode]);
console.log(country,"det")
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
      <div className="card-container1">
      <div className='backbtn'>
        <Link to="/" className="btn">
         <img src={darkMode? arrow:arrow1}/>Back
        </Link>
      </div>
    
      {country && ( // Check if country is not null
      <div className="card1" key={country.cca3}>
         <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
         <div style={{width:"60%",paddingBottom:"2%"}}>
                  <h2>{country.name && country.name.common}</h2>
         <div className='data'>
          <div>
          <p>Population: <span>{country.population}</span></p>
          <p>Region: <span>{country.region}</span></p>
          <p>Sub Region: <span>{country.subregion}</span></p>
          <p>Capital: <span>{country.capital && country.capital[0]}</span></p>
          </div>
          <div>
          <p>Top-Level Domain: <span>{country.tld && country.tld.join(', ')}</span></p>
          <p>Currencies: <span>{country.currencies && Object.values(country.currencies).join(', ')}</span></p>
          <p>Languages: <span>{country.languages && Object.values(country.languages).join(', ')}</span></p>
            </div>
          </div>
          <p className='bordercont'>Border Countries</p>
          <ul>
            {country.borders ? (
              country.borders.map((border: string) => (
                <li key={border}>
                  <Link to={`/country/${border}`}>{border}</Link>
                </li>
              ))
            ) : (
              <li>No border countries found</li>
            )}
          </ul>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default CountryDetailPage;
