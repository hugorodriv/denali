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
    return (
      <>
      <br />
      <center> 
          <div role="status">
              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
          </div>
        </center>
      </>
    );
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
  props.APIData.filter(AirportFilterFunction(props.origin)).map(
    (p, index) => ((lat1 = p.lat), (lng1 = p.lng)),
  );
  props.APIData.filter(AirportFilterFunction(props.destination)).map(
    (p, index) => ((lat2 = p.lat), (lng2 = p.lng)),
  );
  
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
          {distance.toFixed(2)} km
        </p>
      </div>
    );
  } else {
    return null;
  }
}
export default Airports;
