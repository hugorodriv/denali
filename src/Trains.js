import React, { useEffect, useState } from "react";
import boco from "./BoCo.png";

function TrainSearchFilters(props) {
  return (
    <>
      <div class="container mx-auto p-12">
        <h1 class="text-3xl text-center mb-8">
          CO2 Emissions Calculator - Irish Trains
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
        <br></br>
        <Exposition />
        <div class="mb-4">
          <label class="text-sm font-medium text-gray-600">Departure</label>
          <input
            onChange={props.changeOriginFromParent}
            class="mt-1 p-2 border rounded w-full"
            list="train-origin-list"
          />
          <datalist id="train-origin-list">
            {props.APIData.filter(
              props.trainFilterFunctionFromParent(props.origin),
            ).map((p, index) => (
              <option value={p.StationDesc}></option>
            ))}
          </datalist>
        </div>
        <div class="mb-4">
          <label class="text-sm font-medium text-gray-600">Destination</label>
          <input
            onChange={props.changeDestinationFromParent}
            class="mt-1 p-2 border rounded w-full"
            list="train-destination-list"
          />
          <datalist id="train-destination-list">
            {props.APIData.filter(
              props.trainFilterFunctionFromParent(props.destination),
            ).map((p, index) => (
              <option value={p.StationDesc}></option>
            ))}
          </datalist>
        </div>
        <div class="mb-4">
          <label class="text-sm font-medium text-gray-600">Pick a model</label>
          <select
            onChange={props.changeModelFromParent}
            class="mt-1 p-2 border rounded w-full"
          >
            <option value="" selected disabled>
              Pick a model
            </option>
            {props.transportationModelsFromParent
              .filter(props.filterTotFromParent(props.categoryFromParent))
              .map((p, index) => (
                <option value={p.model}>{p.model}</option>
              ))}
          </select>
        </div>

        <div class="text-center">
          <button
            onClick={props.flipShowResultsFromParent}
            type="button"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Calculate CO2 Emissions
          </button>
        </div>
      </div>
    </>
  );
}
function Exposition() {
  return (
    <>
      <h1 style={{ color: "green", textAlign: "center" }}>Background</h1>
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
export default TrainSearchFilters;
