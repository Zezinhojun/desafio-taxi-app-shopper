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

// src/domain/usecase/EstimateRideUseCase.ts
var EstimateRideUseCase_exports = {};
__export(EstimateRideUseCase_exports, {
  EstimateRideUseCase: () => EstimateRideUseCase
});
module.exports = __toCommonJS(EstimateRideUseCase_exports);

// src/domain/entities/Driver.ts
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

// src/domain/entities/RideEstimate.ts
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

// src/domain/usecase/EstimateRideUseCase.ts
var import_inversify = require("inversify");
var EstimateRideUseCase = class {
  constructor(driverRepository, googleMapsDataSource) {
    this.driverRepository = driverRepository;
    this.googleMapsDataSource = googleMapsDataSource;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      customerId,
      origin,
      destination
    }) {
      if (!customerId || !origin || !destination || origin === destination) {
        throw new Error("INVALID_DATA");
      }
      const originLocation = yield this.googleMapsDataSource.geocodeAddress(origin);
      const destinationLocation = yield this.googleMapsDataSource.geocodeAddress(destination);
      const responseGoogle = yield this.googleMapsDataSource.calculateRoute(
        originLocation,
        destinationLocation
      );
      if (!(responseGoogle == null ? void 0 : responseGoogle.distance)) {
        throw new Error("Unable to calculate route details");
      }
      const availableDrivers = yield this.driverRepository.findEligibleDrivers(
        responseGoogle.distance
      );
      const mappedDrivers = availableDrivers.map((driver) => {
        return new Driver({
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: driver.vehicle,
          ratePerKm: driver.ratePerKm,
          minimumDistance: driver.minimumDistance,
          reviews: driver.review
        });
      });
      const rideEstimateParams = {
        origin: originLocation,
        destination: destinationLocation,
        distance: responseGoogle.distance,
        duration: responseGoogle.duration,
        options: mappedDrivers,
        routeResponse: responseGoogle.originalResponse
      };
      return new RideEstimate(rideEstimateParams);
    });
  }
};
EstimateRideUseCase = __decorateClass([
  __decorateParam(0, (0, import_inversify.inject)(TYPES.DriverRepository)),
  __decorateParam(1, (0, import_inversify.inject)(TYPES.GoogleMapsDataSource))
], EstimateRideUseCase);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EstimateRideUseCase
});
