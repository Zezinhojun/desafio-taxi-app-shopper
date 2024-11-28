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

// src/tests/inMemoryRepositories/InMemoryRideRepository.ts
var InMemoryRideRepository_exports = {};
__export(InMemoryRideRepository_exports, {
  InMemoryRideRepository: () => InMemoryRideRepository
});
module.exports = __toCommonJS(InMemoryRideRepository_exports);
var InMemoryRideRepository = class {
  constructor() {
    this.rides = [];
  }
  save(ride) {
    return __async(this, null, function* () {
      this.rides.push(ride);
      return ride;
    });
  }
  findByCustomerId(customerId) {
    return __async(this, null, function* () {
      return this.rides.filter((ride) => ride.customerId === customerId);
    });
  }
  findByDriverId(driverId) {
    return __async(this, null, function* () {
      return this.rides.filter((r) => r.driver.id === driverId);
    });
  }
  clear() {
    this.rides.length = 0;
  }
  set ridesList(rides) {
    this.rides.push(...rides);
  }
  get ridesList() {
    return this.rides;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryRideRepository
});
