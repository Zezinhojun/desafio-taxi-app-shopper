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

// src/tests/unit/entities/Driver.spec.ts
var Driver_spec_exports = {};
__export(Driver_spec_exports, {
  mockDriverFactory: () => mockDriverFactory
});
module.exports = __toCommonJS(Driver_spec_exports);

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

// src/tests/unit/entities/Driver.spec.ts
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var fixedDrivers = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../../utils/drivers.json"), "utf-8")
);
var mockDriverFactory = (driverId) => {
  const driverData = driverId ? fixedDrivers.find((d) => d.id === driverId) || fixedDrivers[0] : fixedDrivers[Math.floor(Math.random() * fixedDrivers.length)];
  return new Driver(driverData);
};
describe("Driver", () => {
  let driver;
  beforeEach(() => {
    jest.resetAllMocks();
    driver = mockDriverFactory();
  });
  it("should create a Driver with valid data", () => {
    expect(driver).toBeInstanceOf(Driver);
    expect(driver.id).toBeDefined();
    expect(driver.ratePerKm).toBeDefined();
    expect(driver.isEligibleForDistance(1)).toBeDefined();
  });
  it("should calculate the ride value correctly", () => {
    const distance = 10;
    const expectedValue = distance * driver.ratePerKm;
    expect(driver.calculateRideValue(distance)).toBe(expectedValue);
  });
  it("should determine if the driver is eligible for the ride distance", () => {
    const shortDistance = 0.4;
    const longDistance = 10;
    expect(driver.isEligibleForDistance(shortDistance)).toBeFalsy();
    expect(driver.isEligibleForDistance(longDistance)).toBeTruthy();
  });
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mockDriverFactory
});
