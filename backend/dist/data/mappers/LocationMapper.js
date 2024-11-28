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

// src/data/mappers/LocationMapper.ts
var LocationMapper_exports = {};
__export(LocationMapper_exports, {
  LocationMapper: () => LocationMapper
});
module.exports = __toCommonJS(LocationMapper_exports);

// src/data/datasources/entities/Location.ts
var import_typeorm = require("typeorm");
var LocationORM = class {
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)("uuid")
], LocationORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm.Column)("varchar")
], LocationORM.prototype, "address", 2);
__decorateClass([
  (0, import_typeorm.Column)("float")
], LocationORM.prototype, "latitude", 2);
__decorateClass([
  (0, import_typeorm.Column)("float")
], LocationORM.prototype, "longitude", 2);
LocationORM = __decorateClass([
  (0, import_typeorm.Entity)("locations")
], LocationORM);

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

// src/data/mappers/LocationMapper.ts
var LocationMapper = class {
  static toDomain(ormEntity) {
    if (!ormEntity) {
      throw new Error("Invalid LocationORM object.");
    }
    return new Location({
      address: ormEntity.address,
      latitude: ormEntity.latitude,
      longitude: ormEntity.longitude
    });
  }
  static toOrm(domainEntity) {
    if (!domainEntity) {
      throw new Error("Invalid Location object.");
    }
    const ormEntity = new LocationORM();
    ormEntity.address = domainEntity.address;
    ormEntity.latitude = domainEntity.latitude;
    ormEntity.longitude = domainEntity.longitude;
    return ormEntity;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LocationMapper
});
