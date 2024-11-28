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

// src/domain/entities/Ride.ts
var Ride_exports = {};
__export(Ride_exports, {
  Ride: () => Ride
});
module.exports = __toCommonJS(Ride_exports);
var Ride = class {
  constructor({
    id,
    customerId,
    origin,
    destination,
    distance,
    duration,
    driver,
    value,
    date
  }) {
    if (id) {
      this._id = id;
    }
    this._customerId = customerId;
    this._origin = origin;
    this._destination = destination;
    this._distance = distance;
    this._duration = duration;
    this._driver = driver;
    this._value = value;
    this._date = date;
  }
  get origin() {
    return this._origin;
  }
  get destination() {
    return this._destination;
  }
  get id() {
    return this._id;
  }
  get customerId() {
    return this._customerId;
  }
  get driver() {
    return this._driver;
  }
  get distance() {
    return this._distance;
  }
  get duration() {
    return this._duration;
  }
  get value() {
    return this._value;
  }
  get date() {
    return this._date;
  }
  estimateRide() {
    return this._driver.calculateRideValue(this._distance);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Ride
});
