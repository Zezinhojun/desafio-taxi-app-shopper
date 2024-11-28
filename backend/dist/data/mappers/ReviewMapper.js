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

// src/data/mappers/ReviewMapper.ts
var ReviewMapper_exports = {};
__export(ReviewMapper_exports, {
  ReviewMapper: () => ReviewMapper
});
module.exports = __toCommonJS(ReviewMapper_exports);

// src/data/datasources/entities/Review.ts
var import_typeorm6 = require("typeorm");

// src/data/datasources/entities/Driver.ts
var import_typeorm2 = require("typeorm");

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

// src/data/datasources/entities/Driver.ts
var DriverORM = class {
};
__decorateClass([
  (0, import_typeorm2.PrimaryGeneratedColumn)()
], DriverORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm2.Column)("varchar")
], DriverORM.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm2.Column)("text")
], DriverORM.prototype, "description", 2);
__decorateClass([
  (0, import_typeorm2.OneToOne)(() => VehicleORM),
  (0, import_typeorm2.JoinColumn)()
], DriverORM.prototype, "vehicle", 2);
__decorateClass([
  (0, import_typeorm2.OneToMany)(() => ReviewORM, (review) => review.driver, { cascade: true })
], DriverORM.prototype, "reviews", 2);
__decorateClass([
  (0, import_typeorm2.Column)("float")
], DriverORM.prototype, "ratePerKm", 2);
__decorateClass([
  (0, import_typeorm2.Column)("float")
], DriverORM.prototype, "minimumDistance", 2);
__decorateClass([
  (0, import_typeorm2.OneToMany)(() => ReviewORM, (ride) => ride.driver)
], DriverORM.prototype, "rides", 2);
DriverORM = __decorateClass([
  (0, import_typeorm2.Entity)("drivers")
], DriverORM);

// src/data/datasources/entities/Customer.ts
var import_typeorm5 = require("typeorm");

// src/data/datasources/entities/Ride.ts
var import_typeorm4 = require("typeorm");

// src/data/datasources/entities/Location.ts
var import_typeorm3 = require("typeorm");
var LocationORM = class {
};
__decorateClass([
  (0, import_typeorm3.PrimaryGeneratedColumn)("uuid")
], LocationORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm3.Column)("varchar")
], LocationORM.prototype, "address", 2);
__decorateClass([
  (0, import_typeorm3.Column)("float")
], LocationORM.prototype, "latitude", 2);
__decorateClass([
  (0, import_typeorm3.Column)("float")
], LocationORM.prototype, "longitude", 2);
LocationORM = __decorateClass([
  (0, import_typeorm3.Entity)("locations")
], LocationORM);

// src/data/datasources/entities/Ride.ts
var RideORM = class {
};
__decorateClass([
  (0, import_typeorm4.PrimaryGeneratedColumn)()
], RideORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm4.ManyToOne)(() => CustomerORM),
  (0, import_typeorm4.JoinColumn)({ name: "customerId" })
], RideORM.prototype, "customer", 2);
__decorateClass([
  (0, import_typeorm4.ManyToOne)(() => DriverORM),
  (0, import_typeorm4.JoinColumn)({ name: "driverId" })
], RideORM.prototype, "driver", 2);
__decorateClass([
  (0, import_typeorm4.OneToOne)(() => LocationORM),
  (0, import_typeorm4.JoinColumn)({ name: "originId" })
], RideORM.prototype, "origin", 2);
__decorateClass([
  (0, import_typeorm4.OneToOne)(() => LocationORM),
  (0, import_typeorm4.JoinColumn)({ name: "destinationId" })
], RideORM.prototype, "destination", 2);
__decorateClass([
  (0, import_typeorm4.Column)("float")
], RideORM.prototype, "distance", 2);
__decorateClass([
  (0, import_typeorm4.Column)("varchar")
], RideORM.prototype, "duration", 2);
__decorateClass([
  (0, import_typeorm4.Column)("float")
], RideORM.prototype, "value", 2);
__decorateClass([
  (0, import_typeorm4.CreateDateColumn)()
], RideORM.prototype, "createdAt", 2);
RideORM = __decorateClass([
  (0, import_typeorm4.Entity)("rides")
], RideORM);

// src/data/datasources/entities/Customer.ts
var CustomerORM = class {
};
__decorateClass([
  (0, import_typeorm5.PrimaryGeneratedColumn)()
], CustomerORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm5.OneToMany)(() => RideORM, (ride) => ride.customer)
], CustomerORM.prototype, "rides", 2);
CustomerORM = __decorateClass([
  (0, import_typeorm5.Entity)("customers")
], CustomerORM);

// src/data/datasources/entities/Review.ts
var ReviewORM = class {
};
__decorateClass([
  (0, import_typeorm6.PrimaryGeneratedColumn)()
], ReviewORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm6.Column)("float", { nullable: false })
], ReviewORM.prototype, "rating", 2);
__decorateClass([
  (0, import_typeorm6.Column)("text", { nullable: true })
], ReviewORM.prototype, "comment", 2);
__decorateClass([
  (0, import_typeorm6.ManyToOne)(() => DriverORM, (driver) => driver.reviews),
  (0, import_typeorm6.JoinColumn)({ name: "driverId" })
], ReviewORM.prototype, "driver", 2);
__decorateClass([
  (0, import_typeorm6.ManyToOne)(() => CustomerORM, (customer) => customer.rides),
  (0, import_typeorm6.JoinColumn)({ name: "customerId" })
], ReviewORM.prototype, "customer", 2);
__decorateClass([
  (0, import_typeorm6.ManyToOne)(() => DriverORM, (driver) => driver.reviews, {
    onDelete: "CASCADE"
  }),
  (0, import_typeorm6.CreateDateColumn)()
], ReviewORM.prototype, "date", 2);
ReviewORM = __decorateClass([
  (0, import_typeorm6.Entity)("reviews")
], ReviewORM);

// src/domain/entities/Review.ts
var Review = class {
  constructor({ rating, comment }) {
    this._rating = rating;
    this._comment = comment;
  }
  get rating() {
    return this._rating;
  }
  get comment() {
    return this._comment;
  }
};

// src/data/mappers/ReviewMapper.ts
var ReviewMapper = class {
  static toDomain(ormEntity) {
    return new Review({
      id: ormEntity.id,
      rating: ormEntity.rating,
      comment: ormEntity.comment
    });
  }
  static toOrm(domainEntity) {
    const ormEntity = new ReviewORM();
    ormEntity.rating = domainEntity.rating;
    ormEntity.comment = domainEntity.comment;
    return ormEntity;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ReviewMapper
});
