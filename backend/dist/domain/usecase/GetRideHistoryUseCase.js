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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
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

// src/domain/usecase/GetRideHistoryUseCase.ts
var GetRideHistoryUseCase_exports = {};
__export(GetRideHistoryUseCase_exports, {
  GetRideHistoryUseCase: () => GetRideHistoryUseCase
});
module.exports = __toCommonJS(GetRideHistoryUseCase_exports);

// src/shared/di/Types.ts
var TYPES = {
  RideService: Symbol.for("RideService"),
  RideController: Symbol.for("RideController"),
  RideRoutes: Symbol.for("RideRoutes"),
  RideRepository: Symbol.for("RideRepository"),
  CustomerRepository: Symbol.for("CustomerRepository"),
  DriverRepository: Symbol.for("DriverRepository"),
  GoogleMapsDataSource: Symbol.for("GoogleMapsDataSource"),
  EstimateRideUseCase: Symbol.for("EstimateRideUseCase"),
  GetRideHistoryUseCase: Symbol.for("GetRideHistoryUseCase"),
  ConfirmRideUseCase: Symbol.for("ConfirmRideUseCase"),
  DataSource: Symbol("DataSource"),
  DriverSeedService: Symbol.for("DriverSeedService"),
  CustomerSeedService: Symbol.for("CustomerSeedService"),
  RideSeedService: Symbol.for("RideSeedService")
};

// src/domain/usecase/GetRideHistoryUseCase.ts
var import_inversify = require("inversify");
var GetRideHistoryUseCase = class {
  constructor(customerRepository, driverRepository) {
    this.customerRepository = customerRepository;
    this.driverRepository = driverRepository;
  }
  execute(customerId, driverId) {
    return __async(this, null, function* () {
      var _a;
      const customer = yield this.customerRepository.findById(customerId);
      let driver = null;
      if (driverId !== void 0) {
        driver = yield this.driverRepository.findById(driverId);
        if (!driver) {
          throw new Error("Driver not found");
        }
      }
      const rides = (_a = customer == null ? void 0 : customer.rideHistory) != null ? _a : [];
      if (rides.length === 0) {
        throw new Error("No rides found");
      }
      if (driverId) {
        const filteredRides = rides.filter((ride) => ride.driver.id === driverId);
        if (filteredRides.length === 0) {
          throw new Error("No rides found for this driver");
        }
        return filteredRides;
      }
      rides.sort((a, b) => b.date.getTime() - a.date.getTime());
      return rides;
    });
  }
};
GetRideHistoryUseCase = __decorateClass([
  __decorateParam(0, (0, import_inversify.inject)(TYPES.CustomerRepository)),
  __decorateParam(1, (0, import_inversify.inject)(TYPES.DriverRepository))
], GetRideHistoryUseCase);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GetRideHistoryUseCase
});
