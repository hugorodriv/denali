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
        />
        <AirportResults
          APIData={props.APIData}
          origin={props.originFromParent}
          destination={props.destinationFromParent}
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
  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }
  function calculateDistance(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);
    console.log(dLat, dLon);
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }
  let lat1 = 0;
  let lat2 = 0;
  let lng1 = 0;
  let lng2 = 0;
  try {
    props.APIData.filter(AirportFilterFunction(props.origin)).map(
      (p, index) => ((lat1 = p.lat), (lng1 = p.lng)),
    );
    props.APIData.filter(AirportFilterFunction(props.destination)).map(
      (p, index) => ((lat2 = p.lat), (lng2 = p.lng)),
    );
  } catch {
    console.log("oops");
  }
  let distance = 0.0;
  try {
    distance = calculateDistance(lat1, lng1, lat2, lng2);
  } catch (error) {
    console.log(error);
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
