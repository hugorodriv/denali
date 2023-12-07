import React, { useEffect, useState } from "react";

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

  function changeOrigin(event) {
    setTimeout(() => {
      setOrigin(event.target.value);
    }, 1001);
  }
  function changeDestination(event) {
    setDestination(event.target.value);
  }
  function changeTot(event) {
    setTot(event.target.value);
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
      <div>
        <SearchFilters
          changeOriginFromParent={changeOrigin}
          changeDestinationFromParent={changeDestination}
          changeTotFromParent={changeTot}
          flipShowResultsFromParent={flipShowResults}
          showResultsFromParent={showResults}
          originListFromParent={originList}
          destinationListFromParent={destinationList}
        />
      </div>
      <p>LatO:{originLat}</p>
      <p>LonO{originLon}</p>
      <p>LatD:{destinationLat}</p>
      <p>LonD{destinationLon}</p>
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
            list="origin-list"
          />
          <datalist id="origin-list">
            {props.originListFromParent.map((p, index) => (
              <div lon={p.lon} lat={p.lat}>
                <option value={p.display_name}></option>
              </div>
            ))}
          </datalist>
        </div>

        <div class="mb-4">
          <label class="text-sm font-medium text-gray-600">Destination</label>
          <input
            onChange={props.changeDestinationFromParent}
            class="mt-1 p-2 border rounded w-full"
            list="destination-list"
          />
          <datalist id="destination-list">
            {props.destinationListFromParent.map((p, index) => (
              <div lon={p.lon} lat={p.lat}>
                <option value={p.display_name}></option>
              </div>
            ))}
          </datalist>
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
