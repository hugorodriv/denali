import React, { useEffect, useState } from "react";
import ResultsComponent from "./result/R1.js";
import ResultsComponent2 from "./result/R2.js";
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

  if (error) {
    return <h2>Page cannot be loaded due to {error.toString()}</h2>;
  } else if (loading === false) {
    return <h2>Please wait while page is loading</h2>;
  } else {
    return (
      <>
        <div
          style={{
            backgroundColor: "blue",
          }}
        />
        <h1 style={{ color: "green", textAlign: "center" }}>
          Irish Train Emmissions Calculator
        </h1>
        <img
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 400,
            height: 300,
          }}
          src={boco}
          alt="BoCo"
        />
        <p style={{ color: "darkorange", textAlign: "center" }}>
          A British Railways Class 28 Co-Bo Diesel Engine, infamous for constant
          unreliabilty and smoke emissions
        </p>
        <Exposition />
        <h3 style={{ color: "green", textAlign: "center" }}>
          Type in your departure Station
        </h3>
        <form style={{ color: "green", textAlign: "center" }}>
          <input onChange={onSearchFormChange} type="text" />
        </form>
        <ResultsComponent
          searchTermfromParent={searchTerm}
          setCoordinates1={setCoordinates1}
          APIData={data}
        />
        <h3 style={{ color: "green", textAlign: "center" }}>
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
        <p style={{ color: "darkorange", textAlign: "center" }}>
          Your route between {searchTerm} and {searchTerm2} is{" "}
          <b>{calculateDistance(lat1, long1, lat2, long2)} kilometers</b> long,
          thus producing{" "}
          <b>
            {calculateDistance(lat1, long1, lat2, long2) * 91} grams of CO2
            emmissions
          </b>
        </p>
      </>
    );
  }
}
export default App;
