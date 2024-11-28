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

// src/domain/entities/Driver.ts
var Driver_exports = {};
__export(Driver_exports, {
  Driver: () => Driver
});
module.exports = __toCommonJS(Driver_exports);
var Driver = class {
  constructor({
    id,
    name,
    description,
    vehicle,
    ratePerKm,
    minimumDistance,
    reviews: review
  }) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._vehicle = vehicle;
    this._ratePerKm = ratePerKm;
    this._minimumDistance = minimumDistance;
    this._review = review;
  }
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get vehicle() {
    return this._vehicle;
  }
  get ratePerKm() {
    return this._ratePerKm;
  }
  get minimumDistance() {
    return this._minimumDistance;
  }
  get review() {
    return this._review;
  }
  calculateRideValue(distance) {
    return distance * this._ratePerKm;
  }
  isEligibleForDistance(distance) {
    return distance >= this._minimumDistance;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Driver
});
