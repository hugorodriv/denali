import React, { useEffect, useState } from "react";

function AirportSearchFilters(props) {
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
export default AirportSearchFilters;
