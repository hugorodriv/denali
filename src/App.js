import React, { useEffect, useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [lat1, setLat1] = useState(0);
  const [long1, setLong1] = useState(0);
  const [lat2, setLat2] = useState(0);
  const [long2, setLong2] = useState(0);

  function onSearchFormChange(event) {
    setSearchTerm(event.target.value);
  }
  function onSearchFormChange2(e) {
    setSearchTerm2(event.target.value);
  }
  function setCoordinates1(lt, lg) {
    setLat1(lt);
    setLong1(lg);
  }
  function setCoordinates2(lt2, lg2) {
    setLat2(lt2);
    setLong2(lg2);
  }
  useEffect(() => {
    const URL =
      "https://raw.githubusercontent.com/hugorodriv/denali/main/public/Station";
    async function fetchTrainData() {
      try {
        const response = await fetch(URL);
        const TrainDatajson = await response.json();
        setLoading(true);
        setData(TrainDatajson.objStation);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchTrainData();
  }, []);

  if (error) {
    return <h2>Page cannot be loaded due to {error.toString()}</h2>;
  } else if (loading === false) {
    return <h2>Please wait while page is loading</h2>;
  } else {
    function calculateDistance(lat1, long1, lat2, long2) {
      let distance =
        Math.acos(
          Math.sin(lat1) * Math.sin(lat2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.cos(long2 - long1)
        ) * 6371;
      return distance;
    }
    return (
      <>
        <h1>Train Emmissions Calculator</h1>
        <h4>Type in your departure Station</h4>
        <form>
          <input onChange={onSearchFormChange} type="text" />
        </form>
        <ResultsComponent
          searchTermfromParent={searchTerm}
          setCoordinates1={setCoordinates1}
          APIData={data}
        />
        <h4>Type in your destination Station</h4>
        <form>
          <input onChange={onSearchFormChange2} type="text" />
        </form>
        <ResultsComponent2
          searchTermfromParent2={searchTerm2}
          setCoordinates2={setCoordinates2}
          APIData2={data}
        />
        <p>
          {lat1}, {long1}
        </p>
        <p>
          {lat2}, {long2}
        </p>
      </>
    );
  }
}
function ResultsComponent(props) {
  function stationFilterFunction(searchTerm) {
    return function (stationObject) {
      let loco = stationObject.StationDesc.toLowerCase();
      return searchTerm !== "" && loco.includes(searchTerm.toLowerCase());
    };
  }
  return (
    <>
      {props.APIData.filter(
        stationFilterFunction(props.searchTermfromParent)
      ).map((a, index) => {
        props.setCoordinates1(a.StationLatitude, a.StationLongitude);

        return (
          <p key={index}>
            <b>
              {a.StationDesc}, {a.StationLatitude}, {a.StationLongitude}
            </b>
          </p>
        );
      })}
    </>
  );
}
function ResultsComponent2(props) {
  function stationFilterFunction2(searchTerm2) {
    return function (stationObject) {
      let loco = stationObject.StationDesc.toLowerCase();
      return searchTerm2 !== "" && loco.includes(searchTerm2.toLowerCase());
    };
  }
  return (
    <>
      {props.APIData2.filter(
        stationFilterFunction2(props.searchTermfromParent2)
      ).map((a, index) => {
        props.setCoordinates2(a.StationLatitude, a.StationLongitude);
        return (
          <p key={index}>
            <b>
              {a.StationDesc}, {a.StationLatitude}, {a.StationLongitude}
            </b>
          </p>
        );
      })}
    </>
  );
}
export default App;
