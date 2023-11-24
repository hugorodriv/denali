import React, { useEffect, useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const URL = "https://raw.githubusercontent.com/hugorodriv/denali/main/public/Station";
    async function fetchTrainData(){
      try
      {
         const response = await fetch(URL);
         const TrainDatajson = await response.json();
         setLoading(true);
         setData(fetchTrainData.objStation);
      }
      catch(error)
      {
        setError(error);
        setLoading(false);
      }
    }
    fetchTrainData();
  }, []);

  if(error)
  {
    return <h2>Page cannot be loaded due to {error.toString()}</h2>;
  }
  else if(loading === false)
  {
    return <h2>Please wait while page is loading</h2>
  }
  else{
    return(
      <>
      <ResultsComponent API = {data}/>
      </>
    );
  }
  
  function onSearchFormChange(event) {
    setSearchTerm(event.target.value);
  }
  return (
    <>
      <h1>Train Emissions Calculator</h1>
      <p>Searching for [{searchTerm}]</p>
      <form>
        <h4>Type in your departure Station</h4>
        <input onChange={onSearchFormChange} type="text" />
      </form>
      <form>
        <h4>Type in your destination Station</h4>
        <input onChange={onSearchFormChange} type="text" />
      </form>
      <hr />
      <ResultsComponent
        searchTermfromParent={searchTerm}
       trainArrayfromParent={Stations}
      />
    </>
  );
}
function ResultsComponent(props) {
  function StationFilterFunction(searchTerm) {
    return function (stationObject) {
      let loco = stationObject.flight.toLowerCase();
     
      return (
        searchTerm != "" &&
        (loco.includes(searchTerm.toLowerCase()))
      );
    };
  }

  let result = props.trainArrayfromParent.filter(
    StationFilterFunction(props.searchTermfromParent)
  ).length;

  return (
    <>
      <h1>Search Results </h1>
      {props.trainArrayfromParent
        .filter(StationFilterFunction(props.searchTermfromParent))
        .map((a, index) => (
          <p key={index}>
            {a.StationDesc}, {a.StationLattitude}, {a.StationLongitude}
          </p>
        ))}
    </>
  );
}
export default App;
 
