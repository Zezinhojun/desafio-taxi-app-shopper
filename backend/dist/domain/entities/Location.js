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

// src/domain/entities/Location.ts
var Location_exports = {};
__export(Location_exports, {
  Location: () => Location
});
module.exports = __toCommonJS(Location_exports);
var Location = class {
  constructor({ address, latitude, longitude }) {
    this._address = address;
    this._latitude = latitude;
    this._longitude = longitude;
  }
  get id() {
    return this._id;
  }
  get address() {
    return this._address;
  }
  get latitude() {
    return this._latitude;
  }
  get longitude() {
    return this._longitude;
  }
  validateAddress() {
    if (!this._address || this._address.trim().length === 0) {
      return false;
    }
    if (this._latitude === void 0 || this._longitude === void 0 || this._latitude < -90 || this._latitude > 90 || this._longitude < -180 || this._longitude > 180) {
      return false;
    }
    return true;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Location
});
