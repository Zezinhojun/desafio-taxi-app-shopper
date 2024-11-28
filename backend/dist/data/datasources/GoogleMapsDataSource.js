"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/data/datasources/GoogleMapsDataSource.ts
var GoogleMapsDataSource_exports = {};
__export(GoogleMapsDataSource_exports, {
  GoogleMapsDataSource: () => GoogleMapsDataSource
});
module.exports = __toCommonJS(GoogleMapsDataSource_exports);

// src/domain/entities/Location.ts
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

// src/data/datasources/GoogleMapsDataSource.ts
var import_axios = __toESM(require("axios"));
var import_inversify = require("inversify");
var GoogleMapsDataSource = class {
  constructor() {
    var _a;
    this.apiKey = (_a = process.env.GOOGLE_API_KEY) != null ? _a : "";
  }
  geocodeAddress(address) {
    return __async(this, null, function* () {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
      try {
        const response = yield import_axios.default.get(geocodeUrl);
        if (response.data.status !== "OK") {
          throw new Error(`Geocoding failed: ${response.data.status}`);
        }
        const result = response.data.results[0];
        if (!result) {
          throw new Error("Address not found");
        }
        const location = result.geometry.location;
        return new Location({
          address: result.formatted_address,
          latitude: location.lat,
          longitude: location.lng
        });
      } catch (error) {
        console.error("Geocoding Error:", error);
        throw new Error("Geocoding failed");
      }
    });
  }
  calculateRoute(origin, destination) {
    return __async(this, null, function* () {
      const routeUrl = "https://routes.googleapis.com/directions/v2:computeRoutes";
      try {
        const response = yield import_axios.default.post(
          routeUrl,
          {
            origin: {
              location: {
                latLng: {
                  latitude: origin.latitude,
                  longitude: origin.longitude
                }
              }
            },
            destination: {
              location: {
                latLng: {
                  latitude: destination.latitude,
                  longitude: destination.longitude
                }
              }
            },
            travelMode: "DRIVE"
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Goog-api-key": this.apiKey,
              "X-Goog-fieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline"
            }
          }
        );
        const route = response.data.routes[0];
        if (!route) {
          throw new Error("No routes found");
        }
        const routeDetails = {
          distance: route.distanceMeters / 1e3,
          duration: route.duration,
          polyline: route.polyline.encodedPolyline,
          originalResponse: response.data
        };
        return routeDetails;
      } catch (error) {
        console.error("Google Maps Route Calculation Error", error);
        throw new Error("Route calculation failed");
      }
    });
  }
};
GoogleMapsDataSource = __decorateClass([
  (0, import_inversify.injectable)()
], GoogleMapsDataSource);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GoogleMapsDataSource
});
