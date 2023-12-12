import React, { useEffect, useState } from "react";

function CarSearchFilters(props) {
    return (
      <>
        <div class="container mx-auto p-12">
  
          <div class="mb-4">
            <label class="text-sm font-medium text-gray-600">Origin</label>
            <input
              onChange={props.changeOriginFromParent}
              class="mt-1 p-2 border rounded w-full"
              list="origin-list"
            />
            <datalist id="origin-list">
              {props.originListFromParent.map((p, index) => (
                <div lon={p.lon} lat={p.lat}>
                  <option value={p.display_name}></option>
                </div>
              ))}
            </datalist>
          </div>
  
          <div class="mb-4">
            <label class="text-sm font-medium text-gray-600">Destination</label>
            <input
              onChange={props.changeDestinationFromParent}
              class="mt-1 p-2 border rounded w-full"
              list="destination-list"
            />
            <datalist id="destination-list">
              {props.destinationListFromParent.map((p, index) => (
                <div lon={p.lon} lat={p.lat}>
                  <option value={p.display_name}></option>
                </div>
              ))}
            </datalist>
          </div>
  
          <div class="mb-4">
            <label class="text-sm font-medium text-gray-600">
              Pick Transportation
            </label>
            <select
              onChange={props.changeTotFromParent}
              class="mt-1 p-2 border rounded w-full"
            >
              <option value="" selected disabled>
                Choose a type of transportation
              </option>
              <option value="Car">Car</option>
              <option value="EV">EV</option>
              <option value="Train">Train</option>
              <option value="Plane">Plane</option>
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
export default CarSearchFilters;