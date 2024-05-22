import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./Country.css";

export const Country = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all");
        const sortedData = res.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setData(sortedData);
        setFilteredData(sortedData);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, []);
  console.log(data);

  useEffect(() => {
    const result = data.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(result);
  }, [searchTerm, data]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = () => {};

  return (
    <>
      <div className="inputBox">
        <input
          className="input"
          type="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Axtarış edin..."
        />
        <CiSearch className="icon" />
      </div>
      <div className="country">
        {filteredData.map((item, key) => (
          <div key={key} className="card">
            <ul className="cardList">
              <li>
                <img
                  src={item.flags.png}
                  alt={`${item.name.common} flag`}
                  className="cardImg"
                />
              </li>
              <li className="cardName">
                Name: <span className="cardMenu">{item.name.common}</span>
              </li>
              <li className="cardName">
                Capital:{" "}
                <span className="cardMenu">
                  {item.capital ? item.capital[0] : "N/A"}
                </span>
              </li>
              <li className="cardName">
                Population : <span className="cardMenu">{item.population}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};
