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

// src/domain/services/RideService.ts
var RideService_exports = {};
__export(RideService_exports, {
  RideService: () => RideService
});
module.exports = __toCommonJS(RideService_exports);
var import_inversify = require("inversify");

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

// src/domain/services/RideService.ts
var RideService = class {
  constructor(confirmRideUseCase, estimateRideUseCase, getRideHistoryUseCase) {
    this.confirmRideUseCase = confirmRideUseCase;
    this.estimateRideUseCase = estimateRideUseCase;
    this.getRideHistoryUseCase = getRideHistoryUseCase;
  }
  mapToRideEstimateDTO(estimate) {
    const availableDrivers = estimate.listAvailableDrivers();
    return {
      origin: {
        latitude: estimate.origin.latitude,
        longitude: estimate.origin.longitude
      },
      destination: {
        latitude: estimate.destination.latitude,
        longitude: estimate.destination.longitude
      },
      distance: estimate.distance,
      duration: estimate.duration,
      options: availableDrivers.map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle.model,
        review: {
          rating: driver.review[0].rating,
          comment: driver.review[0].comment
        },
        value: driver.calculateRideValue(estimate.distance)
      })),
      routeResponse: estimate.routeResponse
    };
  }
  mapToRideDTO(ride) {
    return {
      id: ride.id,
      date: ride.date,
      origin: ride.origin.address,
      destination: ride.destination.address,
      distance: ride.distance,
      duration: ride.duration,
      driver: {
        id: ride.driver.id,
        name: ride.driver.name
      },
      value: ride.value
    };
  }
  estimateRide(_0) {
    return __async(this, arguments, function* ({
      customerId,
      origin,
      destination
    }) {
      const params = { customerId, origin, destination };
      const estimate = yield this.estimateRideUseCase.execute(params);
      return this.mapToRideEstimateDTO(estimate);
    });
  }
  confirmRide(_0) {
    return __async(this, arguments, function* ({
      customerId,
      rideDetails
    }) {
      const params = { customerId, rideDetails };
      const confirmedRide = yield this.confirmRideUseCase.execute(params);
      return this.mapToRideDTO(confirmedRide);
    });
  }
  getRideHistory(customerId, driverId) {
    return __async(this, null, function* () {
      const rides = yield this.getRideHistoryUseCase.execute(
        customerId,
        driverId
      );
      return {
        customer_id: customerId,
        rides: rides.map((ride) => this.mapToRideDTO(ride))
      };
    });
  }
};
RideService = __decorateClass([
  (0, import_inversify.injectable)(),
  __decorateParam(0, (0, import_inversify.inject)(TYPES.ConfirmRideUseCase)),
  __decorateParam(1, (0, import_inversify.inject)(TYPES.EstimateRideUseCase)),
  __decorateParam(2, (0, import_inversify.inject)(TYPES.GetRideHistoryUseCase))
], RideService);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RideService
});
