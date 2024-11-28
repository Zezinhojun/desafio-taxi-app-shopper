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

// src/data/mappers/VehicleMapper.ts
var VehicleMapper_exports = {};
__export(VehicleMapper_exports, {
  VehicleMapper: () => VehicleMapper
});
module.exports = __toCommonJS(VehicleMapper_exports);

// src/data/datasources/entities/Vehicle.ts
var import_typeorm = require("typeorm");
var VehicleORM = class {
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)()
], VehicleORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm.Column)({ type: "varchar", length: 255 })
], VehicleORM.prototype, "model", 2);
VehicleORM = __decorateClass([
  (0, import_typeorm.Entity)("vehicles")
], VehicleORM);

// src/domain/entities/Vehicle.ts
var Vehicle = class {
  constructor({ id, model }) {
    this._id = id;
    this._model = model;
  }
  get id() {
    return this._id;
  }
  get model() {
    return this._model;
  }
};

// src/data/mappers/VehicleMapper.ts
var VehicleMapper = class {
  static toDomain(ormEntity) {
    return new Vehicle({
      id: ormEntity.id,
      model: ormEntity.model
    });
  }
  static toOrm(domainEntity) {
    const ormEntity = new VehicleORM();
    ormEntity.model = domainEntity.model;
    return ormEntity;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VehicleMapper
});
