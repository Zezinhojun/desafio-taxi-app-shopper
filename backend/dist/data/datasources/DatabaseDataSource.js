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

// src/data/datasources/DatabaseDataSource.ts
var DatabaseDataSource_exports = {};
__export(DatabaseDataSource_exports, {
  AppDataSource: () => AppDataSource
});
module.exports = __toCommonJS(DatabaseDataSource_exports);
var import_typeorm7 = require("typeorm");

// src/data/datasources/entities/Driver.ts
var import_typeorm6 = require("typeorm");

// src/data/datasources/entities/Review.ts
var import_typeorm4 = require("typeorm");

// src/data/datasources/entities/Customer.ts
var import_typeorm3 = require("typeorm");

// src/data/datasources/entities/Ride.ts
var import_typeorm2 = require("typeorm");

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

// src/data/datasources/entities/Ride.ts
var RideORM = class {
};
__decorateClass([
  (0, import_typeorm2.PrimaryGeneratedColumn)()
], RideORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm2.ManyToOne)(() => CustomerORM),
  (0, import_typeorm2.JoinColumn)({ name: "customerId" })
], RideORM.prototype, "customer", 2);
__decorateClass([
  (0, import_typeorm2.ManyToOne)(() => DriverORM),
  (0, import_typeorm2.JoinColumn)({ name: "driverId" })
], RideORM.prototype, "driver", 2);
__decorateClass([
  (0, import_typeorm2.OneToOne)(() => LocationORM),
  (0, import_typeorm2.JoinColumn)({ name: "originId" })
], RideORM.prototype, "origin", 2);
__decorateClass([
  (0, import_typeorm2.OneToOne)(() => LocationORM),
  (0, import_typeorm2.JoinColumn)({ name: "destinationId" })
], RideORM.prototype, "destination", 2);
__decorateClass([
  (0, import_typeorm2.Column)("float")
], RideORM.prototype, "distance", 2);
__decorateClass([
  (0, import_typeorm2.Column)("varchar")
], RideORM.prototype, "duration", 2);
__decorateClass([
  (0, import_typeorm2.Column)("float")
], RideORM.prototype, "value", 2);
__decorateClass([
  (0, import_typeorm2.CreateDateColumn)()
], RideORM.prototype, "createdAt", 2);
RideORM = __decorateClass([
  (0, import_typeorm2.Entity)("rides")
], RideORM);

// src/data/datasources/entities/Customer.ts
var CustomerORM = class {
};
__decorateClass([
  (0, import_typeorm3.PrimaryGeneratedColumn)()
], CustomerORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm3.OneToMany)(() => RideORM, (ride) => ride.customer)
], CustomerORM.prototype, "rides", 2);
CustomerORM = __decorateClass([
  (0, import_typeorm3.Entity)("customers")
], CustomerORM);

// src/data/datasources/entities/Review.ts
var ReviewORM = class {
};
__decorateClass([
  (0, import_typeorm4.PrimaryGeneratedColumn)()
], ReviewORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm4.Column)("float", { nullable: false })
], ReviewORM.prototype, "rating", 2);
__decorateClass([
  (0, import_typeorm4.Column)("text", { nullable: true })
], ReviewORM.prototype, "comment", 2);
__decorateClass([
  (0, import_typeorm4.ManyToOne)(() => DriverORM, (driver) => driver.reviews),
  (0, import_typeorm4.JoinColumn)({ name: "driverId" })
], ReviewORM.prototype, "driver", 2);
__decorateClass([
  (0, import_typeorm4.ManyToOne)(() => CustomerORM, (customer) => customer.rides),
  (0, import_typeorm4.JoinColumn)({ name: "customerId" })
], ReviewORM.prototype, "customer", 2);
__decorateClass([
  (0, import_typeorm4.ManyToOne)(() => DriverORM, (driver) => driver.reviews, {
    onDelete: "CASCADE"
  }),
  (0, import_typeorm4.CreateDateColumn)()
], ReviewORM.prototype, "date", 2);
ReviewORM = __decorateClass([
  (0, import_typeorm4.Entity)("reviews")
], ReviewORM);

// src/data/datasources/entities/Vehicle.ts
var import_typeorm5 = require("typeorm");
var VehicleORM = class {
};
__decorateClass([
  (0, import_typeorm5.PrimaryGeneratedColumn)()
], VehicleORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm5.Column)({ type: "varchar", length: 255 })
], VehicleORM.prototype, "model", 2);
VehicleORM = __decorateClass([
  (0, import_typeorm5.Entity)("vehicles")
], VehicleORM);

// src/data/datasources/entities/Driver.ts
var DriverORM = class {
};
__decorateClass([
  (0, import_typeorm6.PrimaryGeneratedColumn)()
], DriverORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm6.Column)("varchar")
], DriverORM.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm6.Column)("text")
], DriverORM.prototype, "description", 2);
__decorateClass([
  (0, import_typeorm6.OneToOne)(() => VehicleORM),
  (0, import_typeorm6.JoinColumn)()
], DriverORM.prototype, "vehicle", 2);
__decorateClass([
  (0, import_typeorm6.OneToMany)(() => ReviewORM, (review) => review.driver, { cascade: true })
], DriverORM.prototype, "reviews", 2);
__decorateClass([
  (0, import_typeorm6.Column)("float")
], DriverORM.prototype, "ratePerKm", 2);
__decorateClass([
  (0, import_typeorm6.Column)("float")
], DriverORM.prototype, "minimumDistance", 2);
__decorateClass([
  (0, import_typeorm6.OneToMany)(() => ReviewORM, (ride) => ride.driver)
], DriverORM.prototype, "rides", 2);
DriverORM = __decorateClass([
  (0, import_typeorm6.Entity)("drivers")
], DriverORM);

// src/data/datasources/DatabaseDataSource.ts
var _a, _b, _c, _d;
var AppDataSource = new import_typeorm7.DataSource({
  type: "mysql",
  host: (_a = process.env.DB_HOST) != null ? _a : "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: (_b = process.env.DB_USERNAME) != null ? _b : "root",
  password: (_c = process.env.DB_PASSWORD) != null ? _c : "password",
  database: (_d = process.env.DB_NAME) != null ? _d : "taxi_app",
  synchronize: true,
  entities: [
    VehicleORM,
    DriverORM,
    RideORM,
    CustomerORM,
    ReviewORM,
    LocationORM
  ]
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppDataSource
});
