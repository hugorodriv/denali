import React, { useEffect, useState } from "react";

import CarSearchFilters from "./Car.js";
import AirportSearchFilters from "./Airports.js";
import TrainSearchFilters from "./Trains.js";
import { transportationModels } from "./transportation";

function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [trainOrigin, setTrainOrigin] = useState("");
  const [trainDestination, setTrainDestination] = useState("");
  const [airportOrigin, setAirportOrigin] = useState("");
  const [airportDestination, setAirportDestination] = useState("");
  const [tot, setTot] = useState("");
  const [transportationModel, setTransportationModel] = useState("");
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
  const [mode, setMode] = useState("");
  const [airportData, setAirportData] = useState([]);
  const [trainData, setTrainData] = useState([]);

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
  function changeAirportOrigin(event) {
    setAirportOrigin(event.target.value);
    airportData
      .filter(airportFilterFunction(airportOrigin))
      .map((p, index) => (setOriginLat(p.lat), setOriginLon(p.lng)));
  }
  function changeAirportDestination(event) {
    setAirportDestination(event.target.value);
    airportData
      .filter(airportFilterFunction(airportDestination))
      .map((p, index) => (setDestinationLat(p.lat), setDestinationLon(p.lng)));
  }
  function changeTrainOrigin(event) {
    setTrainOrigin(event.target.value);
    trainData
      .filter(trainFilterFunction(trainOrigin))
      .map(
        (p, index) => (
          setOriginLat(p.StationLatitude), setOriginLon(p.StationLongitude)
        ),
      );
  }
  function changeTrainDestination(event) {
    setTrainDestination(event.target.value);
    trainData
      .filter(trainFilterFunction(trainDestination))
      .map(
        (p, index) => (
          setDestinationLat(p.StationLatitude),
          setDestinationLon(p.StationLongitude)
        ),
      );
  }
  function changeTot(event) {
    setTot(event.target.value);
    setShowResults(0);
  }

  function changeTransportationModel(event) {
    setTransportationModel(event.target.value);
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

  function findTotForCo2() {
    return function (haystack) {
      return (
        haystack.model === transportationModel && haystack.category === mode
      );
    };
  }

  function filterTot(totCategory) {
    return function (totObject) {
      return totObject.category === totCategory;
    };
  }

  function airportFilterFunction(searchTerm) {
    return function (airportObject) {
      let country_code = airportObject.country_code.toLowerCase();
      let name = airportObject.name.toLowerCase();
      let search = searchTerm.toLowerCase();
      return (
        (search !== "" && country_code.includes(search)) ||
        name.includes(search)
      );
    };
  }

  function trainFilterFunction(searchTerm) {
    return function (stationObject) {
      let loco = stationObject.StationDesc.toLowerCase();
      return searchTerm !== "" && loco.includes(searchTerm.toLowerCase());
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

  useEffect(() => {
    const URL =
      "https://airlabs.co/api/v9/airports?api_key=8e4dc1c1-49d5-427f-902a-9dac726afc04";

    async function fetchAirportData() {
      try {
        const response = await fetch(URL);
        const airportDataJson = await response.json(); // wait for the JSON response
        setLoading(true);
        setAirportData(airportDataJson.response);
      } catch (error) {
        setError(error); // take the error message from the system
        setLoading(false);
      } // end try-catch block
    } // end of fetchData

    fetchAirportData();
  }, []);

  useEffect(() => {
    const URL =
      "https://raw.githubusercontent.com/hugorodriv/denali/main/public/Station";
    async function fetchTrainData() {
      try {
        const response = await fetch(URL);
        const TrainDatajson = await response.json();
        setLoading(true);
        setTrainData(TrainDatajson.objStation);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchTrainData();
  }, []);

  return (
    <>
      <br />
      <h1 class="text-3xl text-center mb-8">CO2 Emissions Calculator</h1>

      <MainMenu changeModeFromParent={changeMode} />

      {mode === "car" && (
        <CarSearchFilters
          changeOriginFromParent={changeOrigin}
          changeDestinationFromParent={changeDestination}
          changeModelFromParent={changeTransportationModel}
          flipShowResultsFromParent={flipShowResults}
          showResultsFromParent={showResults}
          originListFromParent={originList}
          destinationListFromParent={destinationList}
          transportationModelsFromParent={transportationModels}
          filterTotFromParent={filterTot}
          categoryFromParent={mode}
        />
      )}

      {mode === "plane" && (
        <AirportSearchFilters
          APIData={airportData}
          changeOriginFromParent={changeAirportOrigin}
          changeDestinationFromParent={changeAirportDestination}
          origin={airportOrigin}
          destination={airportDestination}
          changeModelFromParent={changeTransportationModel}
          flipShowResultsFromParent={flipShowResults}
          categoryFromParent={mode}
          transportationModelsFromParent={transportationModels}
          filterTotFromParent={filterTot}
          airportFilterFunctionFromParent={airportFilterFunction}
        />
      )}

      {mode === "train" && (
        <TrainSearchFilters
          APIData={trainData}
          changeOriginFromParent={changeTrainOrigin}
          changeDestinationFromParent={changeTrainDestination}
          origin={trainOrigin}
          destination={trainDestination}
          changeModelFromParent={changeTransportationModel}
          flipShowResultsFromParent={flipShowResults}
          categoryFromParent={mode}
          transportationModelsFromParent={transportationModels}
          filterTotFromParent={filterTot}
          trainFilterFunctionFromParent={trainFilterFunction}
        />
      )}

      <NetworkConnection errorFromParent={error} loadingFromParent={loading} />

      {showResults > 0 && mode === "car" && (
        <Results
          totFromParent={tot}
          originFromParent={origin}
          destinationFromParent={destination}
          originLatFromParent={originLat}
          originLonFromParent={originLon}
          destinationLatFromParent={destinationLat}
          destinationLonFromParent={destinationLon}
          calculateDistanceFromParent={calculateDistance}
          findTotForCo2FromParent={findTotForCo2}
          transportationModelsFromParent={transportationModels}
          transportationModelFromParent={transportationModel}
        />
      )}
      {showResults > 0 && mode === "plane" && (
        <Results
          totFromParent={tot}
          originFromParent={airportOrigin}
          destinationFromParent={airportDestination}
          originLatFromParent={originLat}
          originLonFromParent={originLon}
          destinationLatFromParent={destinationLat}
          destinationLonFromParent={destinationLon}
          calculateDistanceFromParent={calculateDistance}
          findTotForCo2FromParent={findTotForCo2}
          transportationModelsFromParent={transportationModels}
          transportationModelFromParent={transportationModel}
        />
      )}
      {showResults > 0 && mode === "train" && (
        <Results
          totFromParent={tot}
          originFromParent={trainOrigin}
          destinationFromParent={trainDestination}
          originLatFromParent={originLat}
          originLonFromParent={originLon}
          destinationLatFromParent={destinationLat}
          destinationLonFromParent={destinationLon}
          calculateDistanceFromParent={calculateDistance}
          findTotForCo2FromParent={findTotForCo2}
          transportationModelsFromParent={transportationModels}
          transportationModelFromParent={transportationModel}
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
          onClick={() => props.changeModeFromParent("car")}
        >
          🚗 Car
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => props.changeModeFromParent("plane")}
        >
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
  return (
    <div className="text-2xl text-center">
      <p className="mb-4">
        Traveling from{" "}
        <span className="font-bold">
          {props.originFromParent.split(",")[0]}
        </span>{" "}
        to{" "}
        <span className="font-bold">
          {props.destinationFromParent.split(",")[0]}
        </span>{" "}
        by{" "}
        <span className="font-bold">{props.transportationModelFromParent}</span>
        .
      </p>
      <p className="mb-4">
        CO2 amount:{" "}
        <span className="font-bold">
          {(
            props.transportationModelsFromParent[
              props.transportationModelsFromParent.findIndex(
                props.findTotForCo2FromParent(),
              )
            ].Co2PerKm *
            props.calculateDistanceFromParent(
              props.originLatFromParent,
              props.originLonFromParent,
              props.destinationLatFromParent,
              props.destinationLonFromParent,
            )
          ).toFixed(2)}
          {" kg"}
        </span>
      </p>
      <p>
        Distance:{" "}
        <span className="font-bold">
          {props
            .calculateDistanceFromParent(
              props.originLatFromParent,
              props.originLonFromParent,
              props.destinationLatFromParent,
              props.destinationLonFromParent,
            )
            .toFixed(2)}
          {" km"}
        </span>
      </p>
    </div>
  );
}

function NetworkConnection(props) {
  if (props.errorFromParent) {
    return (
      <h2>Page cannot be loaded due to {props.errorFromParent.toString()}</h2>
    );
  } else if (props.loadingFromParent === false) {
    return <h2>Please wait while page is loading</h2>;
  }
}

export default App;
