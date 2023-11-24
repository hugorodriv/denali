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
      <div>
        <p>Origin: <input onChange={props.changeOriginFromParent} type="text" /></p>
        <p>Destination: <input onChange={props.changeDestinationFromParent} type="text" /></p>

        <form>
          <label for="typeOfTransportation" class="form-label">Pick Transportation </label>
          
          <select onChange={props.changeTotFromParent} class="form-control"  id="typeOfTransportation" >
            <option key="0" selected>Choose a type of transportation</option>
            <option key="A" value="Car">Car</option>
            <option key="B" value="EV">EV</option>
            <option key="C" value="Train">Train</option>
            <option key="D" value="Plane">Plane</option>
          </select>
        </form>
        <p/>
        <p/>
        <button onClick={props.flipShowResultsFromParent} type="button" >Calculate CO2 Emissions</button>
      </div> 
    </>
  );

}

function Results(props) {
  return(
    <>
      <hr/>
      <div>Traveling from {props.originFromParent} to {props.destinationFromParent} by {props.totFromParent}, CO2 amount: 1.521t</div>
    </>
  );
}
export default App;
