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

// src/presentation/controllers/RideController.ts
var RideController_exports = {};
__export(RideController_exports, {
  RideController: () => RideController
});
module.exports = __toCommonJS(RideController_exports);

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

// src/presentation/controllers/RideController.ts
var import_inversify = require("inversify");
var RideController = class {
  constructor(rideService) {
    this.rideService = rideService;
    this.estimateRide = (req, res, next) => __async(this, null, function* () {
      const { customer_id, origin, destination } = req.body;
      try {
        const result = yield this.rideService.estimateRide({
          customerId: customer_id,
          origin,
          destination
        });
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    });
    this.confirmRide = (req, res, next) => __async(this, null, function* () {
      const {
        customer_id,
        origin,
        destination,
        driver,
        value
      } = req.body;
      const ride = {
        customerId: customer_id,
        origin,
        destination,
        driver,
        value,
        date: /* @__PURE__ */ new Date()
      };
      try {
        yield this.rideService.confirmRide({
          customerId: customer_id,
          rideDetails: ride
        });
        res.status(200).json({ success: true });
      } catch (error) {
        next(error);
      }
    });
    this.getRideHistory = (req, res, next) => __async(this, null, function* () {
      const { customer_id } = req.params;
      const { driver_id } = req.query;
      if (!customer_id) {
        res.status(400).json({ error: "Customer ID is required" });
      }
      try {
        const driverId = driver_id ? Number(driver_id) : void 0;
        const rides = yield this.rideService.getRideHistory(
          customer_id,
          driverId
        );
        res.status(200).json(rides);
      } catch (error) {
        next(error);
      }
    });
  }
};
RideController = __decorateClass([
  (0, import_inversify.injectable)(),
  __decorateParam(0, (0, import_inversify.inject)(TYPES.RideService))
], RideController);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RideController
});
