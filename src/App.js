import React, { useEffect, useState } from "react";
import ResultsComponent from "./results/R1.js";
import ResultsComponent2 from "./results/R2.js";
import Exposition from "./Exposition.js";
import boco from "./pics/BoCo.png";
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
    setSearchTerm2(e.target.value);
  }
  function setCoordinates1(lt, lg) {
    setLat1(lt);
    setLong1(lg);
  }
  function setCoordinates2(lt2, lg2) {
    setLat2(lt2);
    setLong2(lg2);
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
    return Math.round(earthRadiusKm * c);
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
    return (
      <>
        <h1 style={{ textAlign: "center" }}>
          Irish Train Emmissions Calculator
        </h1>
        <img
          style={{ alignSelf: "center", width: 400, height: 300 }}
          src={boco}
          alt="BoCo"
        />
        <p>
          A British Railways Class 28 Co-Bo Diesel Engine, infamous for constant
          unreliabilty and smoke emissions
        </p>
        <Exposition />
        <h3 style={{ textAlign: "center" }}>Type in your departure Station</h3>
        <form style={{ textAlign: "center" }}>
          <input onChange={onSearchFormChange} type="text" />
        </form>
        <ResultsComponent
          searchTermfromParent={searchTerm}
          setCoordinates1={setCoordinates1}
          APIData={data}
        />
        <h3 style={{ textAlign: "center" }}>
          Type in your destination Station
        </h3>
        <form style={{ textAlign: "center" }}>
          <input onChange={onSearchFormChange2} type="text" />
        </form>
        <ResultsComponent2
          searchTermfromParent2={searchTerm2}
          setCoordinates2={setCoordinates2}
          APIData2={data}
        />
        <p style={{ textAlign: "center" }}>
          Your route is {calculateDistance(lat1, long1, lat2, long2)} kilometers
          long
        </p>
      </>
    );
  }
}
export default App;
