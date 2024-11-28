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

// src/data/mappers/CustomerMapper.ts
var CustomerMapper_exports = {};
__export(CustomerMapper_exports, {
  CustomerMapper: () => CustomerMapper
});
module.exports = __toCommonJS(CustomerMapper_exports);

// src/data/datasources/entities/Customer.ts
var import_typeorm6 = require("typeorm");

// src/data/datasources/entities/Ride.ts
var import_typeorm5 = require("typeorm");

// src/data/datasources/entities/Driver.ts
var import_typeorm3 = require("typeorm");

// src/data/datasources/entities/Review.ts
var import_typeorm = require("typeorm");
var ReviewORM = class {
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)()
], ReviewORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm.Column)("float", { nullable: false })
], ReviewORM.prototype, "rating", 2);
__decorateClass([
  (0, import_typeorm.Column)("text", { nullable: true })
], ReviewORM.prototype, "comment", 2);
__decorateClass([
  (0, import_typeorm.ManyToOne)(() => DriverORM, (driver) => driver.reviews),
  (0, import_typeorm.JoinColumn)({ name: "driverId" })
], ReviewORM.prototype, "driver", 2);
__decorateClass([
  (0, import_typeorm.ManyToOne)(() => CustomerORM, (customer) => customer.rides),
  (0, import_typeorm.JoinColumn)({ name: "customerId" })
], ReviewORM.prototype, "customer", 2);
__decorateClass([
  (0, import_typeorm.ManyToOne)(() => DriverORM, (driver) => driver.reviews, {
    onDelete: "CASCADE"
  }),
  (0, import_typeorm.CreateDateColumn)()
], ReviewORM.prototype, "date", 2);
ReviewORM = __decorateClass([
  (0, import_typeorm.Entity)("reviews")
], ReviewORM);

// src/data/datasources/entities/Vehicle.ts
var import_typeorm2 = require("typeorm");
var VehicleORM = class {
};
__decorateClass([
  (0, import_typeorm2.PrimaryGeneratedColumn)()
], VehicleORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm2.Column)({ type: "varchar", length: 255 })
], VehicleORM.prototype, "model", 2);
VehicleORM = __decorateClass([
  (0, import_typeorm2.Entity)("vehicles")
], VehicleORM);

// src/data/datasources/entities/Driver.ts
var DriverORM = class {
};
__decorateClass([
  (0, import_typeorm3.PrimaryGeneratedColumn)()
], DriverORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm3.Column)("varchar")
], DriverORM.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm3.Column)("text")
], DriverORM.prototype, "description", 2);
__decorateClass([
  (0, import_typeorm3.OneToOne)(() => VehicleORM),
  (0, import_typeorm3.JoinColumn)()
], DriverORM.prototype, "vehicle", 2);
__decorateClass([
  (0, import_typeorm3.OneToMany)(() => ReviewORM, (review) => review.driver, { cascade: true })
], DriverORM.prototype, "reviews", 2);
__decorateClass([
  (0, import_typeorm3.Column)("float")
], DriverORM.prototype, "ratePerKm", 2);
__decorateClass([
  (0, import_typeorm3.Column)("float")
], DriverORM.prototype, "minimumDistance", 2);
__decorateClass([
  (0, import_typeorm3.OneToMany)(() => ReviewORM, (ride) => ride.driver)
], DriverORM.prototype, "rides", 2);
DriverORM = __decorateClass([
  (0, import_typeorm3.Entity)("drivers")
], DriverORM);

// src/data/datasources/entities/Location.ts
var import_typeorm4 = require("typeorm");
var LocationORM = class {
};
__decorateClass([
  (0, import_typeorm4.PrimaryGeneratedColumn)("uuid")
], LocationORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm4.Column)("varchar")
], LocationORM.prototype, "address", 2);
__decorateClass([
  (0, import_typeorm4.Column)("float")
], LocationORM.prototype, "latitude", 2);
__decorateClass([
  (0, import_typeorm4.Column)("float")
], LocationORM.prototype, "longitude", 2);
LocationORM = __decorateClass([
  (0, import_typeorm4.Entity)("locations")
], LocationORM);

// src/data/datasources/entities/Ride.ts
var RideORM = class {
};
__decorateClass([
  (0, import_typeorm5.PrimaryGeneratedColumn)()
], RideORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm5.ManyToOne)(() => CustomerORM),
  (0, import_typeorm5.JoinColumn)({ name: "customerId" })
], RideORM.prototype, "customer", 2);
__decorateClass([
  (0, import_typeorm5.ManyToOne)(() => DriverORM),
  (0, import_typeorm5.JoinColumn)({ name: "driverId" })
], RideORM.prototype, "driver", 2);
__decorateClass([
  (0, import_typeorm5.OneToOne)(() => LocationORM),
  (0, import_typeorm5.JoinColumn)({ name: "originId" })
], RideORM.prototype, "origin", 2);
__decorateClass([
  (0, import_typeorm5.OneToOne)(() => LocationORM),
  (0, import_typeorm5.JoinColumn)({ name: "destinationId" })
], RideORM.prototype, "destination", 2);
__decorateClass([
  (0, import_typeorm5.Column)("float")
], RideORM.prototype, "distance", 2);
__decorateClass([
  (0, import_typeorm5.Column)("varchar")
], RideORM.prototype, "duration", 2);
__decorateClass([
  (0, import_typeorm5.Column)("float")
], RideORM.prototype, "value", 2);
__decorateClass([
  (0, import_typeorm5.CreateDateColumn)()
], RideORM.prototype, "createdAt", 2);
RideORM = __decorateClass([
  (0, import_typeorm5.Entity)("rides")
], RideORM);

// src/data/datasources/entities/Customer.ts
var CustomerORM = class {
};
__decorateClass([
  (0, import_typeorm6.PrimaryGeneratedColumn)()
], CustomerORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm6.OneToMany)(() => RideORM, (ride) => ride.customer)
], CustomerORM.prototype, "rides", 2);
CustomerORM = __decorateClass([
  (0, import_typeorm6.Entity)("customers")
], CustomerORM);

// src/domain/entities/Customer.ts
var Customer = class {
  constructor({ id, rideHistory }) {
    this._id = id;
    this._rideHistory = rideHistory;
  }
  get id() {
    return this._id;
  }
  get rideHistory() {
    return this._rideHistory;
  }
  viewHistory(driverId) {
    if (!driverId) {
      return this._rideHistory;
    }
    return this._rideHistory.filter((ride) => ride.driver.id === driverId);
  }
};

// src/domain/entities/Ride.ts
var Ride = class {
  constructor({
    id,
    customerId,
    origin,
    destination,
    distance,
    duration,
    driver,
    value,
    date
  }) {
    if (id) {
      this._id = id;
    }
    this._customerId = customerId;
    this._origin = origin;
    this._destination = destination;
    this._distance = distance;
    this._duration = duration;
    this._driver = driver;
    this._value = value;
    this._date = date;
  }
  get origin() {
    return this._origin;
  }
  get destination() {
    return this._destination;
  }
  get id() {
    return this._id;
  }
  get customerId() {
    return this._customerId;
  }
  get driver() {
    return this._driver;
  }
  get distance() {
    return this._distance;
  }
  get duration() {
    return this._duration;
  }
  get value() {
    return this._value;
  }
  get date() {
    return this._date;
  }
  estimateRide() {
    return this._driver.calculateRideValue(this._distance);
  }
};

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

// src/data/mappers/RideMapper.ts
var RideMapper = class {
  static toDomain(ormEntity) {
    return new Ride({
      id: ormEntity.id,
      customerId: ormEntity.customer.id,
      driver: DriverMapper.toDomain(ormEntity.driver),
      origin: LocationMapper.toDomain(ormEntity.origin),
      destination: LocationMapper.toDomain(ormEntity.destination),
      distance: ormEntity.distance,
      duration: ormEntity.duration,
      value: ormEntity.value,
      date: ormEntity.createdAt
    });
  }
  static toOrm(domainEntity) {
    const ormEntity = new RideORM();
    const customerORM = new CustomerORM();
    ormEntity.id = domainEntity.id;
    ormEntity.customer = customerORM;
    ormEntity.driver = DriverMapper.toOrm(domainEntity.driver);
    ormEntity.origin = LocationMapper.toOrm(domainEntity.origin);
    ormEntity.destination = LocationMapper.toOrm(domainEntity.destination);
    ormEntity.distance = domainEntity.distance;
    ormEntity.duration = domainEntity.duration;
    ormEntity.value = domainEntity.value;
    ormEntity.createdAt = domainEntity.date;
    return ormEntity;
  }
};

// src/data/mappers/CustomerMapper.ts
var CustomerMapper = class {
  static toDomain(ormEntity) {
    const rideHistory = ormEntity.rides ? ormEntity.rides.map((ride) => {
      return RideMapper.toDomain(ride);
    }) : [];
    return new Customer({
      id: ormEntity.id,
      rideHistory
    });
  }
  static toOrm(domainEntity) {
    const ormEntity = new CustomerORM();
    ormEntity.id = domainEntity.id;
    ormEntity.rides = domainEntity.rideHistory.map(
      (ride) => RideMapper.toOrm(ride)
    );
    return ormEntity;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomerMapper
});
