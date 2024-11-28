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

// src/domain/entities/Customer.ts
var Customer_exports = {};
__export(Customer_exports, {
  Customer: () => Customer
});
module.exports = __toCommonJS(Customer_exports);
var Customer = class {
  constructor({ id, rideHistory }) {
    this._id = id;
    this._rideHistory = rideHistory;
  }
  get id() {
    return this._id;
  }
  get rideHistory() {
    return this._rideHistory;
  }
  viewHistory(driverId) {
    if (!driverId) {
      return this._rideHistory;
    }
    return this._rideHistory.filter((ride) => ride.driver.id === driverId);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Customer
});
