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

// src/data/repositories/DriverRepository.ts
var DriverRepository_exports = {};
__export(DriverRepository_exports, {
  DriverRepository: () => DriverRepository
});
module.exports = __toCommonJS(DriverRepository_exports);
var import_inversify = require("inversify");

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

// src/data/mappers/DriverMapper.ts
var DriverMapper = class {
  static toDomain(ormEntity) {
    if (!ormEntity) {
      throw new Error("Invalid DriverORM object.");
    }
    if (!ormEntity.vehicle) {
      throw new Error("DriverORM must have a Vehicle associated.");
    }
    return new Driver({
      id: ormEntity.id,
      name: ormEntity.name,
      description: ormEntity.description,
      vehicle: VehicleMapper.toDomain(ormEntity.vehicle),
      reviews: Array.isArray(ormEntity.reviews) ? ormEntity.reviews.length > 0 ? ormEntity.reviews.map((review) => ReviewMapper.toDomain(review)) : [] : ormEntity.reviews ? [ReviewMapper.toDomain(ormEntity.reviews)] : [],
      ratePerKm: ormEntity.ratePerKm,
      minimumDistance: ormEntity.minimumDistance
    });
  }
  static toOrm(domainEntity) {
    const ormEntity = new DriverORM();
    ormEntity.id = domainEntity.id;
    ormEntity.name = domainEntity.name;
    ormEntity.description = domainEntity.description;
    ormEntity.reviews = ormEntity.reviews || [];
    if (domainEntity.vehicle) {
      const vehicle = new VehicleORM();
      vehicle.id = domainEntity.vehicle.id;
      vehicle.model = domainEntity.vehicle.model;
      ormEntity.vehicle = vehicle;
    }
    ormEntity.reviews = domainEntity.review.map(
      (review) => ReviewMapper.toOrm(review)
    );
    ormEntity.ratePerKm = domainEntity.ratePerKm;
    ormEntity.minimumDistance = domainEntity.minimumDistance;
    return ormEntity;
  }
};

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

// src/data/repositories/DriverRepository.ts
var DriverRepository = class {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }
  get driverRepository() {
    return this.dataSource.getRepository(DriverORM);
  }
  findById(driverId) {
    return __async(this, null, function* () {
      try {
        const driverOrm = yield this.driverRepository.findOne({
          where: { id: driverId },
          relations: ["vehicle"]
        });
        if (!driverOrm) {
          throw new Error("Driver not found");
        }
        const DriverMapperReturn = DriverMapper.toDomain(driverOrm);
        return DriverMapperReturn;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(
            `Erro ao buscar o driver pelo ID ${driverId}: ${error == null ? void 0 : error.message}`
          );
        }
        throw error;
      }
    });
  }
  findEligibleDrivers(distance) {
    return __async(this, null, function* () {
      const driversOrm = yield this.driverRepository.find({
        relations: ["vehicle", "reviews"]
      });
      const eligibleDrivers = driversOrm.map(DriverMapper.toDomain).filter((driver) => driver.isEligibleForDistance(distance));
      return eligibleDrivers;
    });
  }
};
DriverRepository = __decorateClass([
  (0, import_inversify.injectable)(),
  __decorateParam(0, (0, import_inversify.inject)(TYPES.DataSource))
], DriverRepository);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DriverRepository
});
