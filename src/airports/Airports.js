import React, { useEffect, useState } from "react";

function Airports() {
  // the data response from the API - initially empty array
  const [data, setData] = useState([]);
  // a flag to indicate the data is loading - initially false
  const [loading, setLoading] = useState(false);
  // a flag to indicate an error, if any - initially null.
  const [error, setError] = useState(null);
  // search term to search airports
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  useEffect(() => {
    const URL =
      "https://airlabs.co/api/v9/airports?api_key=8e4dc1c1-49d5-427f-902a-9dac726afc04";

    async function fetchAirportData() {
      try {
        const response = await fetch(URL);
        const airportDataJson = await response.json(); // wait for the JSON response
        setLoading(true);
        setData(airportDataJson.response);
      } catch (error) {
        setError(error); // take the error message from the system
        setLoading(false);
      } // end try-catch block
    } // end of fetchData

    fetchAirportData();
  }, []); // end of useEffect

  function changeOrigin(event) {
    setOrigin(event.target.value);
  }
  function changeDestination(event) {
    setDestination(event.target.value);
  }
  function changeOriginCoords(event) {
    setOriginCoords((event.target.value.lat, event.target.value.lng));
  }
  function changeDestCoords(event) {
    setDestCoords((event.target.value.lat, event.target.value.lng));
  }
  function calculateDistance(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = Math.degreesToRadians(lat2 - lat1);
    var dLon = Math.degreesToRadians(lon2 - lon1);

    lat1 = Math.degreesToRadians(lat1);
    lat2 = Math.degreesToRadians(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }

  if (error) {
    return <h1>Opps! An error has occurred: {error.toString()}</h1>;
  } else if (loading === false) {
    return <h1>Waiting for the airport data ...... waiting....</h1>;
  } else {
    return (
      <>
        <AirportDisplayComponent
          APIData={data}
          originFromParent={origin}
          destinationFromParent={destination}
          changeOrigin={changeOrigin}
          changeDestination={changeDestination}
          calculateDistance={calculateDistance}
          changeOriginCoords={changeOriginCoords}
          changeDestCoords={changeDestCoords}
        />
      </>
    );
  } // end else
} // end App() function or component

function AirportDisplayComponent(props) {
  return (
    <>
      <div>
        <SearchFilters
          APIData={props.APIData}
          changeOriginFromParent={props.changeOrigin}
          changeDestinationFromParent={props.changeDestination}
          origin={props.originFromParent}
          destination={props.destinationFromParent}
          changeOriginCoords={props.changeOriginCoords}
          changeDestCoords={props.changeDestCoords}
        />
        <AirportResults
          APIData={props.APIData}
          origin={props.originFromParent}
          destination={props.destinationFromParent}
          calculateDistance={props.calculateDistance}
        />
      </div>
    </>
  );
}

function SearchFilters(props) {
  function AirportFilterFunction(searchTerm) {
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
  return (
    <>
      <div class="container mx-auto p-12">
        <h1 class="text-3xl text-center mb-8">
          CO2 Emissions Calculator - Airports
        </h1>

        <div class="mb-4">
          <label class="text-sm font-medium text-gray-600">Origin</label>
          <input
            onChange={props.changeOriginFromParent}
            class="mt-1 p-2 border rounded w-full"
            list="airport-origin-list"
          />
          <datalist id="airport-origin-list">
            {props.APIData.filter(AirportFilterFunction(props.origin)).map(
              (p, index) => (
                <div lon={p.lng} lat={p.lat}>
                  <option value={p.name}></option>
                </div>
              ),
            )}
          </datalist>
        </div>

        <div class="mb-4">
          <label class="text-sm font-medium text-gray-600">Destination</label>
          <input
            onChange={props.changeDestinationFromParent}
            class="mt-1 p-2 border rounded w-full"
            list="airport-destination-list"
          />
          <datalist id="airport-destination-list">
            {props.APIData.filter(AirportFilterFunction(props.destination)).map(
              (p, index) => (
                <div lon={p.lng} lat={p.lat}>
                  <option value={p.name}></option>
                </div>
              ),
            )}
          </datalist>
        </div>
      </div>
    </>
  );
}

function AirportResults(props) {
  try {
    console.log(props.origin);
  } catch {
    console.log("oops");
  }
  let distance = 0;
  try {
    distance = props.calculateDistance(
      props.origin.lat,
      props.origin.lng,
      props.destination.lat,
      props.destination.lng,
    );
  } catch {
    distance = "Select valid airports";
  }
  if (props.origin !== "" && props.destination !== "") {
    return (
      <div class="text-2xl text-center">
        <p>
          Traveling from {props.origin} to {props.destination}, distance:{" "}
          {distance}
        </p>
      </div>
    );
  } else {
    return null;
  }
}
export default Airports;
