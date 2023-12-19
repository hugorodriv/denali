import React from "react";
function Exposition() {
  return (
    <>
      <h2 style={{ color: "green", textAlign: "center" }}>Background</h2>
      <p style={{ color: "darkorange", textAlign: "center" }}>
        Ever since replacing steam traction in the mid-20th Century, diesel
        locomotive power has been estimated to produce 91 grams of CO2
        emmissions per kilometer
      </p>
      <p style={{ color: "darkorange", textAlign: "center" }}>
        In this example, we will be using Ireland as an example, by estimating
        the CO2 emissions between stations based on distance
      </p>
      <p style={{ color: "darkorange", textAlign: "center" }}>
        This will be calculated by finding the difference between the latitudes
        and longitudes of each station, converting the latitudes to radians and
        finally using the following formulas to calculate the distance in
        accordance to the angle and radius of the Earth (6371 Kilometers)
      </p>
      <p style={{ color: "darkorange", textAlign: "center" }}>
        <b>NOTE: </b> This will be from a birds eye view, so does not take into
        account traffic, delays or geographical obstructions, such as mountains,
        rivers etc
      </p>
    </>
  );
}
export default Exposition;