import React, { useEffect, useState } from "react";
import CarSearchFilters from "./Car.js";

import AirportDisplayComponent from "./airports/Airports";

function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [tot, setTot] = useState("");
  const [showResults, setShowResults] = useState(0);
  const [originList, setOriginList] = useState([]);
  const [lastOriginList, setLastOriginList] = useState([]);
  const [destinationList, setDestinationList] = useState([]);
  const [lastDestinationList, setLastDestinationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originLon, setOriginLon] = useState([]);
  const [originLat, setOriginLat] = useState([]);
  const [destinationLon, setDestinationLon] = useState([]);
  const [destinationLat, setDestinationLat] = useState([]);
  const [mode, setMode] = useState("")

  function changeMode(newMode) {
    setMode(newMode);
    setShowResults(0);
  }

  function changeOrigin(event) {
    setTimeout(() => {
      setOrigin(event.target.value);
    }, 1001);
  }
  function changeDestination(event) {
    setTimeout(() => {
      setDestination(event.target.value);
    }, 1001);
  }
  function changeTot(event) {
    setTot(event.target.value);
    setShowResults(0);
  }
  function changeModel(event) {
    setModel(event.target.value);
  }
  function flipShowResults() {
    setShowResults(showResults + 1);
  }

  function findDisplayName(needle) {
    return function (haystack) {
      console.log(haystack.display_name);
      console.log(needle);
      console.log(haystack.display_name === needle);
      return haystack.display_name === needle;
    };
  }

  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }

  useEffect(() => {
    // Get OriginData
    const URL = "https://geocode.maps.co/search?city=" + origin;

    async function fetchData() {
      try {
        setLastOriginList(originList);
        const response = await fetch(URL);
        const json = await response.json(); // wait for the JSON response
        setLoading(true);
        // IMPORTANT - look at the JSON response - look at the structure
        setOriginList(json);
      } catch (error) {
        setError(error); // take the error message from the system
        setLoading(false);
      }
      // end try-catch block
    } // end of fetchData
    if (
      origin !== "" &&
      (lastOriginList.length !== 0 || originList.length !== 0)
    ) {
      let templist = [...lastOriginList, ...originList];
      let n = templist.findIndex(findDisplayName(origin));
      let splicedOrigin = templist.splice(n, 1);
      let tempLon = splicedOrigin[0].lon;
      let tempLat = splicedOrigin[0].lat;
      console.log(splicedOrigin);
      setOriginLon(tempLon);
      setOriginLat(tempLat);
    }
    fetchData();
  }, [origin]);

  useEffect(() => {
    // Get OriginData
    const URL = "https://geocode.maps.co/search?city=" + destination;

    async function fetchData() {
      try {
        setLastDestinationList(destinationList);
        const response = await fetch(URL);
        const json = await response.json(); // wait for the JSON response
        setLoading(true);
        // IMPORTANT - look at the JSON response - look at the structure
        setDestinationList(json);
      } catch (error) {
        setError(error); // take the error message from the system
        setLoading(false);
      }
      // end try-catch block
    } // end of fetchData
    if (
      destination !== "" &&
      (lastDestinationList.length !== 0 || destinationList.length !== 0)
    ) {
      let templist = [...lastDestinationList, ...destinationList];
      let n = templist.findIndex(findDisplayName(destination));
      let splicedDestination = templist.splice(n, 1);
      let tempLon = splicedDestination[0].lon;
      let tempLat = splicedDestination[0].lat;
      setDestinationLon(tempLon);
      setDestinationLat(tempLat);
    }
    fetchData();
  }, [destination]);

  return (
    <>
      <br />
      <h1 class="text-3xl text-center mb-8">CO2 Emissions Calculator</h1>

      <MainMenu changeModeFromParent={changeMode} />



      {mode === "car" && (<CarSearchFilters
        changeOriginFromParent={changeOrigin}
        changeDestinationFromParent={changeDestination}
        changeTotFromParent={changeTot}
        flipShowResultsFromParent={flipShowResults}
        showResultsFromParent={showResults}
        originListFromParent={originList}
        destinationListFromParent={destinationList}
      />)}
      {/* <p>LatO:{originLat}</p>
      <p>LonO{originLon}</p>
      <p>LatD:{destinationLat}</p>
      <p>LonD:{destinationLon}</p> */}
      {showResults > 0 && (
        <Results
          totFromParent={tot}
          originFromParent={origin}
          destinationFromParent={destination}
          originLatFromParent={originLat}
          originLonFromParent={originLon}
          destinationLatFromParent={destinationLat}
          destinationLonFromParent={destinationLon}
          calculateDistanceFromParent={calculateDistance}
        />
      )}
    </>
  );
}

function MainMenu(props) {
  return (
    <>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => props.changeModeFromParent("car")}>
          🚗 Car
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => props.changeModeFromParent("plane")}>
          ✈️ Plane
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => props.changeModeFromParent("train")}
        >
          🚂 Train
        </button>
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
      <div className="text-2xl text-center">
        <p className="mb-4">
          Traveling from <span className="font-bold">{props.originFromParent.split(',')[0]}</span>{" "}
          to{" "}
          <span className="font-bold">{props.destinationFromParent.split(',')[0]}</span>{" "}
          by{" "}
          <span className="font-bold">{props.totFromParent}</span>.
        </p>
        <p className="mb-4">CO2 amount: <span className="font-bold">TBD</span></p>
        <p>
          Distance:{" "}
          <span className="font-bold">
            {props.calculateDistanceFromParent(
              props.originLatFromParent,
              props.originLonFromParent,
              props.destinationLatFromParent,
              props.destinationLonFromParent,
            ).toFixed(2)}{" km"}
          </span>
        </p>
      </div>
    );
    
  } else {
    return null;
  }
}

export default App;
