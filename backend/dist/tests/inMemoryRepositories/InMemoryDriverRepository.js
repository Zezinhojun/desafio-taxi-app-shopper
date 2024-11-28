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

// src/tests/inMemoryRepositories/InMemoryDriverRepository.ts
var InMemoryDriverRepository_exports = {};
__export(InMemoryDriverRepository_exports, {
  InMemoryDriverRepository: () => InMemoryDriverRepository
});
module.exports = __toCommonJS(InMemoryDriverRepository_exports);
var InMemoryDriverRepository = class {
  constructor() {
    this.drivers = [];
  }
  findById(id) {
    return __async(this, null, function* () {
      const driver = this.drivers.find((d) => d.id === id);
      return driver || null;
    });
  }
  findEligibleDrivers(distance) {
    return __async(this, null, function* () {
      return this.drivers.filter((d) => d.isEligibleForDistance(distance));
    });
  }
  clear() {
    this.drivers.length = 0;
  }
  set driversList(drivers) {
    this.drivers.push(...drivers);
  }
  get driversList() {
    return this.drivers;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryDriverRepository
});
