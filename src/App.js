import React, { useState } from "react";
// IMPORTANT - we need to import useState if we want
// to use it in our application.

function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [tot, setTot] = useState("");
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
  function flipShowResults() {
    setShowResults(!showResults);
  }
  return (
    <>
      <div>
        <SearchFilters 
          changeOriginFromParent={changeOrigin}
          changeDestinationFromParent={changeDestination}
          changeTotFromParent={changeTot}
          flipShowResultsFromParent={flipShowResults}
          showResultsFromParent={showResults}
        />
      </div>
      {showResults && <Results totFromParent={tot} originFromParent={origin} destinationFromParent={destination}/>}

    </>
  );
}

function SearchFilters(props) {

  return (
    <>

      <div class="container mx-auto p-8">
        <h1 class="text-3xl text-center mb-8">CO2 Emissions Calculator</h1>

        <div class="mb-4">
          <label for="origin" class="block text-sm font-medium text-gray-600">Origin</label>
          <input id="origin" onChange={props.changeOriginFromParent} type="text" class="mt-1 p-2 border rounded w-full" />
        </div>

        <div class="mb-4">
          <label for="destination" class="block text-sm font-medium text-gray-600">Destination</label>
          <input id="destination" onChange={props.changeDestinationFromParent} type="text" class="mt-1 p-2 border rounded w-full" />
        </div>

        <div class="mb-4">
          <label for="typeOfTransportation" class="block text-sm font-medium text-gray-600">Pick Transportation</label>
          <select onChange={props.changeTotFromParent} id="typeOfTransportation" class="mt-1 p-2 border rounded w-full">
            <option value="" selected disabled>Choose a type of transportation</option>
            <option value="Car">Car</option>
            <option value="EV">EV</option>
            <option value="Train">Train</option>
            <option value="Plane">Plane</option>
          </select>
        </div>

        <div class="text-center">
          <button onClick={props.flipShowResultsFromParent} type="button" class="bg-blue-500 text-white px-4 py-2 rounded">Calculate CO2 Emissions</button>
        </div>
      </div>

    </>
  );

}

function Results(props) {
  if (props.totFromParent != "" && props.originFromParent != "" && props.destinationFromParent != "") {
      <>
        <div class="text-2xl text-center mb-8">
          Traveling from {props.originFromParent} 
          to {props.destinationFromParent} 
          by {props.totFromParent}, CO2 amount: 1.521t
        </div>
      </>
    
  }
}
export default App;
