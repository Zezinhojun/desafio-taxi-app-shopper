"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/domain/entities/RideEstimate.ts
var RideEstimate_exports = {};
__export(RideEstimate_exports, {
  RideEstimate: () => RideEstimate
});
module.exports = __toCommonJS(RideEstimate_exports);
var RideEstimate = class {
  constructor({
    origin,
    destination,
    distance,
    duration,
    options: availableDrivers,
    routeResponse
  }) {
    this._origin = origin;
    this._destination = destination;
    this._distance = distance;
    this._duration = duration;
    this._options = availableDrivers;
    this._routeResponse = routeResponse;
  }
  get origin() {
    return this._origin;
  }
  get destination() {
    return this._destination;
  }
  get distance() {
    return this._distance;
  }
  get duration() {
    return this._duration;
  }
  get routeResponse() {
    return this._routeResponse;
  }
  get availableDrivers() {
    return this._options;
  }
  set availableDrivers(drivers) {
    this._options = drivers;
  }
  listAvailableDrivers() {
    return this._options.filter((driver) => driver.isEligibleForDistance(this._distance)).sort(
      (a, b) => a.calculateRideValue(this._distance) - b.calculateRideValue(this._distance)
    );
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RideEstimate
});
