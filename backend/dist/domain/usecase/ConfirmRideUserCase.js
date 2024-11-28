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

// src/domain/usecase/ConfirmRideUserCase.ts
var ConfirmRideUserCase_exports = {};
__export(ConfirmRideUserCase_exports, {
  ConfirmRideUseCase: () => ConfirmRideUseCase
});
module.exports = __toCommonJS(ConfirmRideUserCase_exports);

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

// src/domain/entities/Ride.ts
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

// src/domain/usecase/ConfirmRideUserCase.ts
var import_inversify = require("inversify");
var ConfirmRideUseCase = class {
  constructor(rideRepository, driverRepository, googleMapsDataSource) {
    this.rideRepository = rideRepository;
    this.driverRepository = driverRepository;
    this.googleMapsDataSource = googleMapsDataSource;
  }
  execute(_0) {
    return __async(this, arguments, function* ({ customerId, rideDetails }) {
      if (!rideDetails.origin || !rideDetails.destination || rideDetails.origin === rideDetails.destination) {
        throw new Error("Invalid origin or destination");
      }
      const originAddress = typeof rideDetails.origin === "string" ? rideDetails.origin : rideDetails.origin.address;
      const destinationAddress = typeof rideDetails.destination === "string" ? rideDetails.destination : rideDetails.destination.address;
      const originLocation = yield this.googleMapsDataSource.geocodeAddress(originAddress);
      const destinationLocation = yield this.googleMapsDataSource.geocodeAddress(destinationAddress);
      const responseGoogle = yield this.googleMapsDataSource.calculateRoute(originLocation, destinationLocation);
      const driver = yield this.driverRepository.findById(rideDetails.driver.id);
      if (!driver) {
        throw new Error("Driver not found");
      }
      if (!(driver == null ? void 0 : driver.isEligibleForDistance(responseGoogle.distance))) {
        throw new Error("Invalid distance for this driver");
      }
      const newRide = {
        id: rideDetails.id,
        customerId,
        origin: new Location({
          address: originLocation.address.trim(),
          latitude: originLocation.latitude,
          longitude: originLocation.longitude
        }),
        destination: new Location({
          address: destinationLocation.address.trim(),
          latitude: destinationLocation.latitude,
          longitude: destinationLocation.longitude
        }),
        distance: responseGoogle.distance,
        duration: responseGoogle.duration,
        driver: rideDetails.driver,
        value: rideDetails.value,
        date: rideDetails.date
      };
      const ride = new Ride(newRide);
      return yield this.rideRepository.save(ride);
    });
  }
};
ConfirmRideUseCase = __decorateClass([
  (0, import_inversify.injectable)(),
  __decorateParam(0, (0, import_inversify.inject)(TYPES.RideRepository)),
  __decorateParam(1, (0, import_inversify.inject)(TYPES.DriverRepository)),
  __decorateParam(2, (0, import_inversify.inject)(TYPES.GoogleMapsDataSource))
], ConfirmRideUseCase);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConfirmRideUseCase
});
