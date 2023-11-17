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

  if (error) {
    return <h1>Opps! An error has occurred: {error.toString()}</h1>;
  } else if (loading === false) {
    return <h1>Waiting for the airport data ...... waiting....</h1>;
  } else {
    return (
      // send the data to the TrainDisplayComponent for render
      <>
        <AirportDisplayComponent APIData={data} />
      </>
    );
  } // end else
} // end App() function or component

// This is our TrainDisplayComponent
// This component will display the contents
// the response of the API call from above.

function AirportDisplayComponent(props) {
  return (
    <>
      <h1>The CS385 Airport Tracker App</h1>
      {props.APIData.map((t, index) => (
        <b>{t.iata_code}</b>
      ))}
    </>
  );
}
export default App;
