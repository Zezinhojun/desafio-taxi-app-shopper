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

// src/shared/utils/validation.ts
var validation_exports = {};
__export(validation_exports, {
  RideValidator: () => RideValidator
});
module.exports = __toCommonJS(validation_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RideValidator
});
