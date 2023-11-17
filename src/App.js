import React, { useEffect, useState } from "react";

// This is template code - IT WILL GENERATE ERRORS when loaded
// You will need to make two changes to the code (as outlined in the Lab Instructions)

function App() {
  // the data response from the API - initially empty array
  const [data, setData] = useState([]);
  // a flag to indicate the data is loading - initially false
  const [loading, setLoading] = useState(false);
  // a flag to indicate an error, if any - initially null.
  const [error, setError] = useState(null);
  // search term to search airports
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Change the URL to your chosen JSON file as per Lab 4
    // You will need to copy the URL of one of the 'raw' JSON files
    // on GitHub. Please read the lab instructions.
    const URL =
      "https://airlabs.co/api/v9/airports?api_key=8e4dc1c1-49d5-427f-902a-9dac726afc04";

    async function fetchAirportData() {
      try {
        const response = await fetch(URL);
        const airportDataJson = await response.json(); // wait for the JSON response
        setLoading(true);
        // IMPORTANT - look at the JSON response - look at the structure
        // This is where many errors occur!
        setData(airportDataJson.response);
      } catch (error) {
        setError(error); // take the error message from the system
        setLoading(false);
      } // end try-catch block
    } // end of fetchData

    fetchAirportData(); // invoke fetchTrainData in useEffect
  }, []); // end of useEffect

  function onSearchFormChange(event) {
    setSearchTerm(event.target.value);
  }

  if (error) {
    return <h1>Opps! An error has occurred: {error.toString()}</h1>;
  } else if (loading === false) {
    return <h1>Waiting for the airport data ...... waiting....</h1>;
  } else {
    return (
      // send the data to the TrainDisplayComponent for render
      <>
        <p>Searching: [{searchTerm}]</p>
        <form>
          <h3>Type your search here</h3>
          <input onChange={onSearchFormChange} type="text" />
        </form>
        <hr />
        <AirportDisplayComponent APIData={data} searchTermFromParent={searchTerm}/>
      </>
    );
  } // end else
} // end App() function or component

// This is our TrainDisplayComponent
// This component will display the contents
// the response of the API call from above.

function AirportDisplayComponent(props) {
  function AirportFilterFunction(searchTerm) {
    return function (airportObject) {
      let country_code = airportObject.country_code;
      return (
        searchTerm !== "" &&
        country_code.includes(searchTerm)
      );
    };
  }
  return (
    <>
      <h1>The CS385 Airport Tracker App</h1>
      {props.APIData.filter(AirportFilterFunction(props.searchTermFromParent)).map((t, index) => (
        <p><b>{t.iata_code}</b></p>
      ))}
    </>
  );
}
export default App;
