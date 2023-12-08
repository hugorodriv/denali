import React, { useState } from "react";

import AirportDisplayComponent from "./airports/Airports";

function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [tot, setTot] = useState("");
  const [model, setModel] = useState("");
  const [showResults, setShowResults] = useState(false);

  function changeOrigin(event) {
    setOrigin(event.target.value);
  }
  function changeDestination(event) {
    setDestination(event.target.value);
  }
  function changeTot(event) {
    setTot(event.target.value);
  }
  function changeModel(event) {
    setModel(event.target.value);
  }
  function flipShowResults() {
    setShowResults(!showResults);
  }
  function calculateDistance(lat1, long1, lat2, long2) {
    let distance =
      Math.acos(
        Math.sin(lat1) * Math.sin(lat2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.cos(long2 - long1),
      ) * 6371;
    return distance;
  }
  return (
    <>
      <div>
        <AirportDisplayComponent
          changeOriginFromParent={changeOrigin}
          changeDestinationFromParent={changeDestination}
          changeTotFromParent={changeTot}
          flipShowResultsFromParent={flipShowResults}
          showResultsFromParent={showResults}
        />
      </div>
      <div>
        <SearchFilters
          changeOriginFromParent={changeOrigin}
          changeDestinationFromParent={changeDestination}
          changeTotFromParent={changeTot}
          flipShowResultsFromParent={flipShowResults}
          showResultsFromParent={showResults}
        />
      </div>
      {showResults && (
        <Results
          totFromParent={tot}
          originFromParent={origin}
          destinationFromParent={destination}
        />
      )}
    </>
  );
}

function SearchFilters(props) {
  return (
    <>
      <div class="container mx-auto p-12">
        <h1 class="text-3xl text-center mb-8">CO2 Emissions Calculator</h1>

        <div class="mb-4">
          <label class="text-sm font-medium text-gray-600">Origin</label>
          <input
            onChange={props.changeOriginFromParent}
            class="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div class="mb-4">
          <label class="text-sm font-medium text-gray-600">Destination</label>
          <input
            onChange={props.changeDestinationFromParent}
            class="mt-1 p-2 border rounded w-full"
          />
        </div>

        <div class="mb-4">
          <label class="text-sm font-medium text-gray-600">
            Pick Transportation
          </label>
          <select
            onChange={props.changeTotFromParent}
            class="mt-1 p-2 border rounded w-full"
          >
            <option value="" selected disabled>
              Choose a type of transportation
            </option>
            <option value="Car">Car</option>
            <option value="EV">EV</option>
            <option value="Train">Train</option>
            <option value="Plane">Plane</option>
          </select>
        </div>

        <div class="text-center">
          <button
            onClick={props.flipShowResultsFromParent}
            type="button"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Calculate CO2 Emissions
          </button>
        </div>
      </div>
    </>
  );
}

function Results(props) {
  if (
    props.totFromParent !== "" &&
    props.originFromParent !== "" &&
    props.destinationFromParent !== ""
  ) {
    return (
      <div class="text-2xl text-center">
        <p>
          Traveling from {props.originFromParent} to{" "}
          {props.destinationFromParent} by {props.totFromParent}, CO2 amount:
          *TBD*
        </p>
      </div>
    );
  } else {
    return null;
  }
}
export default App;
