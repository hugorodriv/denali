import React, { useState } from "react";
import { flightData } from "./airlines.js";
// IMPORTANT - we need to import useState if we want
// to use it in our application.

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  function changeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }
  return (
    <>
      <div>
        <input onChange={changeSearchTerm} type="text" />
      </div>
      <hr />
      <Flights
        flightDataInChild={flightData}
        searchTermFromParent={searchTerm}
      />
    </>
  );
}

// This is the Child component called Robert
function Flights(props) {
  let numberResults = props.flightDataInChild.filter(
    filterFlights(props.searchTermFromParent)
  ).length;

  return (
    <>
      <div>
        {numberResults === 1 && <p>No results</p>}
        {numberResults === 1 && <p>One flight available</p>}
        {numberResults >= 2 && numberResults <= 20 && (
          <p>Several flights available</p>
        )}
        {numberResults > 20 && (
          <p>
            A large number of search results – please consider narrowing your
            search
          </p>
        )}
      </div>
      {props.flightDataInChild
        .filter(filterFlights(props.searchTermFromParent))
        .map((a, index) => (
          <p key={index}>
            <b>{a.flight}</b>, From: {a.dept}, To: {a.dest} <i>{a.status}</i>
          </p>
        ))}
    </>
  );

  function filterFlights(searchTerm) {
    return function (flightObject) {
      let flight = flightObject.flight.toLowerCase();
      let dept = flightObject.dept.toLowerCase();
      let dest = flightObject.dest.toLowerCase();
      let status = flightObject.status.toLowerCase();

      return (
        searchTerm !== "" &&
        (flight.includes(searchTerm.toLowerCase()) ||
          dept.includes(searchTerm.toLowerCase()) ||
          dest.includes(searchTerm.toLowerCase()))
      );
    };
  }
}

export default App;
