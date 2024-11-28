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

// src/shared/utils/errorHandler.ts
var errorHandler_exports = {};
__export(errorHandler_exports, {
  default: () => errorHandler_default
});
module.exports = __toCommonJS(errorHandler_exports);
var ErrorHandler = class {
};
ErrorHandler.handleErrors = (err, req, res, next) => {
  const status = err.status || 500;
  if (err.message === "Driver not found") {
    res.status(404).json({
      error_code: "DRIVER_NOT_FOUND",
      error_description: "Driver not found"
    });
    return;
  }
  if (err.message === "Customer not found") {
    res.status(404).json({
      error_code: "CUSTOMER_NOT_FOUND",
      error_description: "Customer not found"
    });
    return;
  }
  if (err.message === "No rides found" || err.message === "No rides found for this driver") {
    res.status(404).json({
      error_code: "NO_RIDES_FOUND",
      error_description: "No rides found for the specified customer."
    });
    return;
  }
  if (err.message === "Invalid distance for this driver") {
    res.status(406).json({
      error_code: "INVALID_DISTANCE",
      error_description: "Invalid distance for this driver"
    });
    return;
  }
  res.status(status).json({
    error_code: "INTERNAL_SERVER_ERROR",
    error_description: "An unexpected error occurred. Please try again later."
  });
  next();
};
var errorHandler_default = ErrorHandler;
