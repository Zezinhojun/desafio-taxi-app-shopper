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

// src/presentation/routes/rideRoutes.ts
var rideRoutes_exports = {};
__export(rideRoutes_exports, {
  RideRoutes: () => RideRoutes
});
module.exports = __toCommonJS(rideRoutes_exports);

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

// src/shared/utils/validation.ts
var RideValidator = class {
};
RideValidator.validateEstimateRide = (req, res, next) => {
  const { customer_id, origin, destination } = req.body;
  if (!customer_id) {
    res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "The customer ID is missing."
    });
    return;
  }
  if (!origin || !destination) {
    res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "The origin and destination are missing."
    });
    return;
  }
  if (origin === destination) {
    res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "The origin and destination cannot be the same."
    });
    return;
  }
  next();
};
RideValidator.validateConfirmRide = (req, res, next) => {
  const { customer_id, origin, destination, driver, distance } = req.body;
  if (!customer_id) {
    res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "The customer ID is missing."
    });
    return;
  }
  if (!origin || !destination) {
    res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "The origin and destination are missing."
    });
    return;
  }
  if (origin === destination) {
    res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "The origin and destination cannot be the same."
    });
    return;
  }
  if (!driver) {
    res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "A valid driver option must be provided."
    });
    return;
  }
  if (distance <= 0) {
    res.status(406).json({
      error_code: "INVALID_DISTANCE",
      error_description: "The provided distance is invalid for the driver."
    });
    return;
  }
  next();
};
RideValidator.validateCustomerAndDriver = (req, res, next) => {
  const { customer_id } = req.params;
  const { driver_id } = req.query;
  if (!customer_id) {
    res.status(400).json({
      error_code: "INVALID_DATA",
      error_description: "The customer ID is missing."
    });
    return;
  }
  if (driver_id && isNaN(Number(driver_id))) {
    res.status(400).json({
      error_code: "INVALID_DRIVER",
      error_description: "The driver ID is invalid. Please provide a valid numeric driver ID."
    });
    return;
  }
  next();
};

// src/presentation/routes/rideRoutes.ts
var import_express = require("express");
var import_inversify = require("inversify");
var RideRoutes = class {
  constructor(rideController) {
    this.rideController = rideController;
    this.router = (0, import_express.Router)();
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.post(
      "/estimate",
      RideValidator.validateEstimateRide,
      this.rideController.estimateRide
    );
    this.router.patch(
      "/confirm",
      RideValidator.validateConfirmRide,
      this.rideController.confirmRide
    );
    this.router.get("/history", RideValidator.validateCustomerAndDriver);
    this.router.get(
      "/history/:customer_id",
      RideValidator.validateCustomerAndDriver,
      this.rideController.getRideHistory
    );
  }
};
RideRoutes = __decorateClass([
  (0, import_inversify.injectable)(),
  __decorateParam(0, (0, import_inversify.inject)(TYPES.RideController))
], RideRoutes);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RideRoutes
});
