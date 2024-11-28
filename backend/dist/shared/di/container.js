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

// src/shared/di/container.ts
var container_exports = {};
__export(container_exports, {
  container: () => container,
  initializeContainer: () => initializeContainer
});
module.exports = __toCommonJS(container_exports);
var import_inversify14 = require("inversify");

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

// src/data/datasources/entities/Ride.ts
var import_typeorm6 = require("typeorm");

// src/data/datasources/entities/Customer.ts
var import_typeorm2 = require("typeorm");
var CustomerORM = class {
};
__decorateClass([
  (0, import_typeorm2.PrimaryGeneratedColumn)()
], CustomerORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm2.OneToMany)(() => RideORM, (ride) => ride.customer)
], CustomerORM.prototype, "rides", 2);
CustomerORM = __decorateClass([
  (0, import_typeorm2.Entity)("customers")
], CustomerORM);

// src/data/datasources/entities/Driver.ts
var import_typeorm5 = require("typeorm");

// src/data/datasources/entities/Review.ts
var import_typeorm3 = require("typeorm");
var ReviewORM = class {
};
__decorateClass([
  (0, import_typeorm3.PrimaryGeneratedColumn)()
], ReviewORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm3.Column)("float", { nullable: false })
], ReviewORM.prototype, "rating", 2);
__decorateClass([
  (0, import_typeorm3.Column)("text", { nullable: true })
], ReviewORM.prototype, "comment", 2);
__decorateClass([
  (0, import_typeorm3.ManyToOne)(() => DriverORM, (driver) => driver.reviews),
  (0, import_typeorm3.JoinColumn)({ name: "driverId" })
], ReviewORM.prototype, "driver", 2);
__decorateClass([
  (0, import_typeorm3.ManyToOne)(() => CustomerORM, (customer) => customer.rides),
  (0, import_typeorm3.JoinColumn)({ name: "customerId" })
], ReviewORM.prototype, "customer", 2);
__decorateClass([
  (0, import_typeorm3.ManyToOne)(() => DriverORM, (driver) => driver.reviews, {
    onDelete: "CASCADE"
  }),
  (0, import_typeorm3.CreateDateColumn)()
], ReviewORM.prototype, "date", 2);
ReviewORM = __decorateClass([
  (0, import_typeorm3.Entity)("reviews")
], ReviewORM);

// src/data/datasources/entities/Vehicle.ts
var import_typeorm4 = require("typeorm");
var VehicleORM = class {
};
__decorateClass([
  (0, import_typeorm4.PrimaryGeneratedColumn)()
], VehicleORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm4.Column)({ type: "varchar", length: 255 })
], VehicleORM.prototype, "model", 2);
VehicleORM = __decorateClass([
  (0, import_typeorm4.Entity)("vehicles")
], VehicleORM);

// src/data/datasources/entities/Driver.ts
var DriverORM = class {
};
__decorateClass([
  (0, import_typeorm5.PrimaryGeneratedColumn)()
], DriverORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm5.Column)("varchar")
], DriverORM.prototype, "name", 2);
__decorateClass([
  (0, import_typeorm5.Column)("text")
], DriverORM.prototype, "description", 2);
__decorateClass([
  (0, import_typeorm5.OneToOne)(() => VehicleORM),
  (0, import_typeorm5.JoinColumn)()
], DriverORM.prototype, "vehicle", 2);
__decorateClass([
  (0, import_typeorm5.OneToMany)(() => ReviewORM, (review) => review.driver, { cascade: true })
], DriverORM.prototype, "reviews", 2);
__decorateClass([
  (0, import_typeorm5.Column)("float")
], DriverORM.prototype, "ratePerKm", 2);
__decorateClass([
  (0, import_typeorm5.Column)("float")
], DriverORM.prototype, "minimumDistance", 2);
__decorateClass([
  (0, import_typeorm5.OneToMany)(() => ReviewORM, (ride) => ride.driver)
], DriverORM.prototype, "rides", 2);
DriverORM = __decorateClass([
  (0, import_typeorm5.Entity)("drivers")
], DriverORM);

// src/data/datasources/entities/Ride.ts
var RideORM = class {
};
__decorateClass([
  (0, import_typeorm6.PrimaryGeneratedColumn)()
], RideORM.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm6.ManyToOne)(() => CustomerORM),
  (0, import_typeorm6.JoinColumn)({ name: "customerId" })
], RideORM.prototype, "customer", 2);
__decorateClass([
  (0, import_typeorm6.ManyToOne)(() => DriverORM),
  (0, import_typeorm6.JoinColumn)({ name: "driverId" })
], RideORM.prototype, "driver", 2);
__decorateClass([
  (0, import_typeorm6.OneToOne)(() => LocationORM),
  (0, import_typeorm6.JoinColumn)({ name: "originId" })
], RideORM.prototype, "origin", 2);
__decorateClass([
  (0, import_typeorm6.OneToOne)(() => LocationORM),
  (0, import_typeorm6.JoinColumn)({ name: "destinationId" })
], RideORM.prototype, "destination", 2);
__decorateClass([
  (0, import_typeorm6.Column)("float")
], RideORM.prototype, "distance", 2);
__decorateClass([
  (0, import_typeorm6.Column)("varchar")
], RideORM.prototype, "duration", 2);
__decorateClass([
  (0, import_typeorm6.Column)("float")
], RideORM.prototype, "value", 2);
__decorateClass([
  (0, import_typeorm6.CreateDateColumn)()
], RideORM.prototype, "createdAt", 2);
RideORM = __decorateClass([
  (0, import_typeorm6.Entity)("rides")
], RideORM);

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

// src/data/repositories/RideRepository.ts
var import_inversify = require("inversify");
var RideRepository = class {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }
  get rideRepository() {
    return this.dataSource.getRepository(RideORM);
  }
  get locationRepository() {
    return this.dataSource.getRepository(LocationORM);
  }
  get customerRepository() {
    return this.dataSource.getRepository(CustomerORM);
  }
  get driverRepository() {
    return this.dataSource.getRepository(DriverORM);
  }
  findByDriverId(driverId) {
    return __async(this, null, function* () {
      const ridesOrm = yield this.rideRepository.find({
        where: { driver: { id: driverId } },
        relations: [
          "customer",
          "driver",
          "driver.vehicle",
          "driver.reviews",
          "origin",
          "destination"
        ]
      });
      return ridesOrm.map(RideMapper.toDomain);
    });
  }
  save(ride) {
    return __async(this, null, function* () {
      const customer = yield this.customerRepository.findOne({
        where: { id: ride.customerId }
      });
      if (!customer) {
        throw new Error("Customer not found");
      }
      const driver = yield this.driverRepository.findOne({
        where: { id: ride.driver.id }
      });
      if (!driver) {
        throw new Error(`Driver not found`);
      }
      const origin = yield this.locationRepository.save(
        LocationMapper.toOrm(ride.origin)
      );
      const destination = yield this.locationRepository.save(
        LocationMapper.toOrm(ride.destination)
      );
      const rideOrm = this.rideRepository.create({
        id: ride.id,
        customer,
        driver,
        origin,
        destination,
        distance: ride.distance,
        createdAt: ride.date,
        duration: ride.duration,
        value: ride.value
      });
      const savedRide = yield this.rideRepository.save(rideOrm);
      return new Ride({
        id: savedRide.id,
        customerId: savedRide.customer.id,
        date: savedRide.createdAt,
        origin: ride.origin,
        destination: ride.destination,
        duration: ride.duration,
        value: ride.value,
        driver: ride.driver,
        distance: ride.distance
      });
    });
  }
};
RideRepository = __decorateClass([
  (0, import_inversify.injectable)(),
  __decorateParam(0, (0, import_inversify.inject)(TYPES.DataSource))
], RideRepository);

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

// src/data/repositories/CustomerRepository.ts
var import_inversify2 = require("inversify");
var CustomerRepository = class {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }
  get customerRepository() {
    return this.dataSource.getRepository(CustomerORM);
  }
  findById(customerId) {
    return __async(this, null, function* () {
      const customerOrm = yield this.customerRepository.findOne({
        where: { id: customerId },
        relations: [
          "rides",
          "rides.customer",
          "rides.origin",
          "rides.destination",
          "rides.driver",
          "rides.driver.vehicle",
          "rides.driver.reviews"
        ]
      });
      if (!customerOrm) {
        throw new Error("Customer not found");
      }
      return CustomerMapper.toDomain(customerOrm);
    });
  }
};
CustomerRepository = __decorateClass([
  (0, import_inversify2.injectable)(),
  __decorateParam(0, (0, import_inversify2.inject)(TYPES.DataSource))
], CustomerRepository);

// src/data/datasources/GoogleMapsDataSource.ts
var import_axios = __toESM(require("axios"));
var import_inversify3 = require("inversify");
var GoogleMapsDataSource = class {
  constructor() {
    var _a2;
    this.apiKey = (_a2 = process.env.GOOGLE_API_KEY) != null ? _a2 : "";
  }
  geocodeAddress(address) {
    return __async(this, null, function* () {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
      try {
        const response = yield import_axios.default.get(geocodeUrl);
        if (response.data.status !== "OK") {
          throw new Error(`Geocoding failed: ${response.data.status}`);
        }
        const result = response.data.results[0];
        if (!result) {
          throw new Error("Address not found");
        }
        const location = result.geometry.location;
        return new Location({
          address: result.formatted_address,
          latitude: location.lat,
          longitude: location.lng
        });
      } catch (error) {
        console.error("Geocoding Error:", error);
        throw new Error("Geocoding failed");
      }
    });
  }
  calculateRoute(origin, destination) {
    return __async(this, null, function* () {
      const routeUrl = "https://routes.googleapis.com/directions/v2:computeRoutes";
      try {
        const response = yield import_axios.default.post(
          routeUrl,
          {
            origin: {
              location: {
                latLng: {
                  latitude: origin.latitude,
                  longitude: origin.longitude
                }
              }
            },
            destination: {
              location: {
                latLng: {
                  latitude: destination.latitude,
                  longitude: destination.longitude
                }
              }
            },
            travelMode: "DRIVE"
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-Goog-api-key": this.apiKey,
              "X-Goog-fieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline"
            }
          }
        );
        const route = response.data.routes[0];
        if (!route) {
          throw new Error("No routes found");
        }
        const routeDetails = {
          distance: route.distanceMeters / 1e3,
          duration: route.duration,
          polyline: route.polyline.encodedPolyline,
          originalResponse: response.data
        };
        return routeDetails;
      } catch (error) {
        console.error("Google Maps Route Calculation Error", error);
        throw new Error("Route calculation failed");
      }
    });
  }
};
GoogleMapsDataSource = __decorateClass([
  (0, import_inversify3.injectable)()
], GoogleMapsDataSource);

// src/domain/entities/RideEstimate.ts
var RideEstimate = class {
  constructor({
    origin,
    destination,
    distance,
    duration,
    options: availableDrivers,
    routeResponse
  }) {
    this._origin = origin;
    this._destination = destination;
    this._distance = distance;
    this._duration = duration;
    this._options = availableDrivers;
    this._routeResponse = routeResponse;
  }
  get origin() {
    return this._origin;
  }
  get destination() {
    return this._destination;
  }
  get distance() {
    return this._distance;
  }
  get duration() {
    return this._duration;
  }
  get routeResponse() {
    return this._routeResponse;
  }
  get availableDrivers() {
    return this._options;
  }
  set availableDrivers(drivers) {
    this._options = drivers;
  }
  listAvailableDrivers() {
    return this._options.filter((driver) => driver.isEligibleForDistance(this._distance)).sort(
      (a, b) => a.calculateRideValue(this._distance) - b.calculateRideValue(this._distance)
    );
  }
};

// src/domain/usecase/EstimateRideUseCase.ts
var import_inversify4 = require("inversify");
var EstimateRideUseCase = class {
  constructor(driverRepository, googleMapsDataSource) {
    this.driverRepository = driverRepository;
    this.googleMapsDataSource = googleMapsDataSource;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      customerId,
      origin,
      destination
    }) {
      if (!customerId || !origin || !destination || origin === destination) {
        throw new Error("INVALID_DATA");
      }
      const originLocation = yield this.googleMapsDataSource.geocodeAddress(origin);
      const destinationLocation = yield this.googleMapsDataSource.geocodeAddress(destination);
      const responseGoogle = yield this.googleMapsDataSource.calculateRoute(
        originLocation,
        destinationLocation
      );
      if (!(responseGoogle == null ? void 0 : responseGoogle.distance)) {
        throw new Error("Unable to calculate route details");
      }
      const availableDrivers = yield this.driverRepository.findEligibleDrivers(
        responseGoogle.distance
      );
      const mappedDrivers = availableDrivers.map((driver) => {
        return new Driver({
          id: driver.id,
          name: driver.name,
          description: driver.description,
          vehicle: driver.vehicle,
          ratePerKm: driver.ratePerKm,
          minimumDistance: driver.minimumDistance,
          reviews: driver.review
        });
      });
      const rideEstimateParams = {
        origin: originLocation,
        destination: destinationLocation,
        distance: responseGoogle.distance,
        duration: responseGoogle.duration,
        options: mappedDrivers,
        routeResponse: responseGoogle.originalResponse
      };
      return new RideEstimate(rideEstimateParams);
    });
  }
};
EstimateRideUseCase = __decorateClass([
  __decorateParam(0, (0, import_inversify4.inject)(TYPES.DriverRepository)),
  __decorateParam(1, (0, import_inversify4.inject)(TYPES.GoogleMapsDataSource))
], EstimateRideUseCase);

// src/domain/services/RideService.ts
var import_inversify5 = require("inversify");
var RideService = class {
  constructor(confirmRideUseCase, estimateRideUseCase, getRideHistoryUseCase) {
    this.confirmRideUseCase = confirmRideUseCase;
    this.estimateRideUseCase = estimateRideUseCase;
    this.getRideHistoryUseCase = getRideHistoryUseCase;
  }
  mapToRideEstimateDTO(estimate) {
    const availableDrivers = estimate.listAvailableDrivers();
    return {
      origin: {
        latitude: estimate.origin.latitude,
        longitude: estimate.origin.longitude
      },
      destination: {
        latitude: estimate.destination.latitude,
        longitude: estimate.destination.longitude
      },
      distance: estimate.distance,
      duration: estimate.duration,
      options: availableDrivers.map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle.model,
        review: {
          rating: driver.review[0].rating,
          comment: driver.review[0].comment
        },
        value: driver.calculateRideValue(estimate.distance)
      })),
      routeResponse: estimate.routeResponse
    };
  }
  mapToRideDTO(ride) {
    return {
      id: ride.id,
      date: ride.date,
      origin: ride.origin.address,
      destination: ride.destination.address,
      distance: ride.distance,
      duration: ride.duration,
      driver: {
        id: ride.driver.id,
        name: ride.driver.name
      },
      value: ride.value
    };
  }
  estimateRide(_0) {
    return __async(this, arguments, function* ({
      customerId,
      origin,
      destination
    }) {
      const params = { customerId, origin, destination };
      const estimate = yield this.estimateRideUseCase.execute(params);
      return this.mapToRideEstimateDTO(estimate);
    });
  }
  confirmRide(_0) {
    return __async(this, arguments, function* ({
      customerId,
      rideDetails
    }) {
      const params = { customerId, rideDetails };
      const confirmedRide = yield this.confirmRideUseCase.execute(params);
      return this.mapToRideDTO(confirmedRide);
    });
  }
  getRideHistory(customerId, driverId) {
    return __async(this, null, function* () {
      const rides = yield this.getRideHistoryUseCase.execute(
        customerId,
        driverId
      );
      return {
        customer_id: customerId,
        rides: rides.map((ride) => this.mapToRideDTO(ride))
      };
    });
  }
};
RideService = __decorateClass([
  (0, import_inversify5.injectable)(),
  __decorateParam(0, (0, import_inversify5.inject)(TYPES.ConfirmRideUseCase)),
  __decorateParam(1, (0, import_inversify5.inject)(TYPES.EstimateRideUseCase)),
  __decorateParam(2, (0, import_inversify5.inject)(TYPES.GetRideHistoryUseCase))
], RideService);

// src/domain/usecase/ConfirmRideUserCase.ts
var import_inversify6 = require("inversify");
var ConfirmRideUseCase = class {
  constructor(rideRepository, driverRepository, googleMapsDataSource) {
    this.rideRepository = rideRepository;
    this.driverRepository = driverRepository;
    this.googleMapsDataSource = googleMapsDataSource;
  }
  execute(_0) {
    return __async(this, arguments, function* ({ customerId, rideDetails }) {
      if (!rideDetails.origin || !rideDetails.destination || rideDetails.origin === rideDetails.destination) {
        throw new Error("Invalid origin or destination");
      }
      const originAddress = typeof rideDetails.origin === "string" ? rideDetails.origin : rideDetails.origin.address;
      const destinationAddress = typeof rideDetails.destination === "string" ? rideDetails.destination : rideDetails.destination.address;
      const originLocation = yield this.googleMapsDataSource.geocodeAddress(originAddress);
      const destinationLocation = yield this.googleMapsDataSource.geocodeAddress(destinationAddress);
      const responseGoogle = yield this.googleMapsDataSource.calculateRoute(originLocation, destinationLocation);
      const driver = yield this.driverRepository.findById(rideDetails.driver.id);
      if (!driver) {
        throw new Error("Driver not found");
      }
      if (!(driver == null ? void 0 : driver.isEligibleForDistance(responseGoogle.distance))) {
        throw new Error("Invalid distance for this driver");
      }
      const newRide = {
        id: rideDetails.id,
        customerId,
        origin: new Location({
          address: originLocation.address.trim(),
          latitude: originLocation.latitude,
          longitude: originLocation.longitude
        }),
        destination: new Location({
          address: destinationLocation.address.trim(),
          latitude: destinationLocation.latitude,
          longitude: destinationLocation.longitude
        }),
        distance: responseGoogle.distance,
        duration: responseGoogle.duration,
        driver: rideDetails.driver,
        value: rideDetails.value,
        date: rideDetails.date
      };
      const ride = new Ride(newRide);
      return yield this.rideRepository.save(ride);
    });
  }
};
ConfirmRideUseCase = __decorateClass([
  (0, import_inversify6.injectable)(),
  __decorateParam(0, (0, import_inversify6.inject)(TYPES.RideRepository)),
  __decorateParam(1, (0, import_inversify6.inject)(TYPES.DriverRepository)),
  __decorateParam(2, (0, import_inversify6.inject)(TYPES.GoogleMapsDataSource))
], ConfirmRideUseCase);

// src/domain/usecase/GetRideHistoryUseCase.ts
var import_inversify7 = require("inversify");
var GetRideHistoryUseCase = class {
  constructor(customerRepository, driverRepository) {
    this.customerRepository = customerRepository;
    this.driverRepository = driverRepository;
  }
  execute(customerId, driverId) {
    return __async(this, null, function* () {
      var _a2;
      const customer = yield this.customerRepository.findById(customerId);
      let driver = null;
      if (driverId !== void 0) {
        driver = yield this.driverRepository.findById(driverId);
        if (!driver) {
          throw new Error("Driver not found");
        }
      }
      const rides = (_a2 = customer == null ? void 0 : customer.rideHistory) != null ? _a2 : [];
      if (rides.length === 0) {
        throw new Error("No rides found");
      }
      if (driverId) {
        const filteredRides = rides.filter((ride) => ride.driver.id === driverId);
        if (filteredRides.length === 0) {
          throw new Error("No rides found for this driver");
        }
        return filteredRides;
      }
      rides.sort((a, b) => b.date.getTime() - a.date.getTime());
      return rides;
    });
  }
};
GetRideHistoryUseCase = __decorateClass([
  __decorateParam(0, (0, import_inversify7.inject)(TYPES.CustomerRepository)),
  __decorateParam(1, (0, import_inversify7.inject)(TYPES.DriverRepository))
], GetRideHistoryUseCase);

// src/presentation/controllers/RideController.ts
var import_inversify8 = require("inversify");
var RideController = class {
  constructor(rideService) {
    this.rideService = rideService;
    this.estimateRide = (req, res, next) => __async(this, null, function* () {
      const { customer_id, origin, destination } = req.body;
      try {
        const result = yield this.rideService.estimateRide({
          customerId: customer_id,
          origin,
          destination
        });
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    });
    this.confirmRide = (req, res, next) => __async(this, null, function* () {
      const {
        customer_id,
        origin,
        destination,
        driver,
        value
      } = req.body;
      const ride = {
        customerId: customer_id,
        origin,
        destination,
        driver,
        value,
        date: /* @__PURE__ */ new Date()
      };
      try {
        yield this.rideService.confirmRide({
          customerId: customer_id,
          rideDetails: ride
        });
        res.status(200).json({ success: true });
      } catch (error) {
        next(error);
      }
    });
    this.getRideHistory = (req, res, next) => __async(this, null, function* () {
      const { customer_id } = req.params;
      const { driver_id } = req.query;
      if (!customer_id) {
        res.status(400).json({ error: "Customer ID is required" });
      }
      try {
        const driverId = driver_id ? Number(driver_id) : void 0;
        const rides = yield this.rideService.getRideHistory(
          customer_id,
          driverId
        );
        res.status(200).json(rides);
      } catch (error) {
        next(error);
      }
    });
  }
};
RideController = __decorateClass([
  (0, import_inversify8.injectable)(),
  __decorateParam(0, (0, import_inversify8.inject)(TYPES.RideService))
], RideController);

// src/shared/utils/validation.ts
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

// src/presentation/routes/rideRoutes.ts
var import_express = require("express");
var import_inversify9 = require("inversify");
var RideRoutes = class {
  constructor(rideController) {
    this.rideController = rideController;
    this.router = (0, import_express.Router)();
    this.initializeRoutes();
  }
  initializeRoutes() {
    this.router.post(
      "/estimate",
      RideValidator.validateEstimateRide,
      this.rideController.estimateRide
    );
    this.router.patch(
      "/confirm",
      RideValidator.validateConfirmRide,
      this.rideController.confirmRide
    );
    this.router.get("/history", RideValidator.validateCustomerAndDriver);
    this.router.get(
      "/history/:customer_id",
      RideValidator.validateCustomerAndDriver,
      this.rideController.getRideHistory
    );
  }
};
RideRoutes = __decorateClass([
  (0, import_inversify9.injectable)(),
  __decorateParam(0, (0, import_inversify9.inject)(TYPES.RideController))
], RideRoutes);

// src/data/datasources/DatabaseDataSource.ts
var import_typeorm7 = require("typeorm");
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

// src/data/repositories/DriverRepository.ts
var import_inversify10 = require("inversify");
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
  (0, import_inversify10.injectable)(),
  __decorateParam(0, (0, import_inversify10.inject)(TYPES.DataSource))
], DriverRepository);

// src/seeds/driver.seed.ts
var import_inversify11 = require("inversify");
var DriverSeedService = class {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }
  seedDrivers() {
    return __async(this, null, function* () {
      const driverRepository = this.dataSource.getRepository(DriverORM);
      const vehicleRepository = this.dataSource.getRepository(VehicleORM);
      const existingDriversCount = yield driverRepository.count();
      if (existingDriversCount >= 3) {
        return;
      }
      const driversData = [
        {
          id: 1,
          name: "Homer Simpson",
          description: "Ol\xE1! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
          vehicle: {
            id: "1",
            model: "Plymouth Valiant 1973 rosa e enferrujado"
          },
          review: [
            {
              rating: 2,
              comment: "Motorista simp\xE1tico, mas errou o caminho 3 vezes. O carro cheira a donuts."
            }
          ],
          minimumDistance: 1,
          ratePerKm: 2.5
        },
        {
          id: 2,
          name: "Dominic Toretto",
          description: "Ei, aqui \xE9 o Dom. Pode entrar, vou te levar com seguran\xE7a e rapidez ao seu destino. S\xF3 n\xE3o mexa no r\xE1dio, a playlist \xE9 sagrada.",
          vehicle: {
            id: "2",
            model: "Dodge Charger R/T 1970 modificado"
          },
          review: [
            {
              rating: 4,
              comment: "Que viagem incr\xEDvel! O carro \xE9 um show \xE0 parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!"
            }
          ],
          ratePerKm: 5,
          minimumDistance: 5
        },
        {
          id: 3,
          name: "James Bond",
          description: "Boa noite, sou James Bond. \xC0 seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
          vehicle: {
            id: "3",
            model: "Aston Martin DB5 cl\xE1ssico"
          },
          review: [
            {
              rating: 5,
              comment: "Servi\xE7o impec\xE1vel! O motorista \xE9 a pr\xF3pria defini\xE7\xE3o de classe e o carro \xE9 simplesmente magn\xEDfico. Uma experi\xEAncia digna de um agente secreto."
            }
          ],
          ratePerKm: 10,
          minimumDistance: 10
        }
      ];
      const queryRunner = this.dataSource.createQueryRunner();
      yield queryRunner.connect();
      yield queryRunner.startTransaction();
      try {
        const vehiclesData = driversData.map((driverData) => ({
          id: driverData.vehicle.id,
          model: driverData.vehicle.model
        }));
        for (const vehicleData of vehiclesData) {
          const vehicleOrm = new VehicleORM();
          vehicleOrm.id = vehicleData.id;
          vehicleOrm.model = vehicleData.model;
          yield vehicleRepository.save(vehicleOrm);
        }
        for (const driverData of driversData) {
          const vehicle = new Vehicle({
            id: driverData.vehicle.id,
            model: driverData.vehicle.model
          });
          const review = driverData.review.map(
            (rev) => new Review({
              rating: rev.rating,
              comment: rev.comment
            })
          );
          const driverDomain = new Driver({
            id: driverData.id,
            name: driverData.name,
            description: driverData.description,
            vehicle,
            reviews: review,
            ratePerKm: driverData.ratePerKm,
            minimumDistance: driverData.minimumDistance
          });
          const driverOrm = DriverMapper.toOrm(driverDomain);
          yield driverRepository.save(driverOrm);
        }
        yield queryRunner.commitTransaction();
      } catch (error) {
        yield queryRunner.rollbackTransaction();
        console.error("Erro ao executar seed de drivers:", error);
      } finally {
        yield queryRunner.release();
      }
    });
  }
};
DriverSeedService = __decorateClass([
  (0, import_inversify11.injectable)(),
  __decorateParam(0, (0, import_inversify11.inject)(TYPES.DataSource))
], DriverSeedService);

// src/shared/di/container.ts
var import_promise = __toESM(require("mysql2/promise"));

// src/seeds/customer.seed.ts
var import_inversify12 = require("inversify");
var CustomerSeedService = class {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }
  seedCustomer() {
    return __async(this, null, function* () {
      const customerRepository = this.dataSource.getRepository(CustomerORM);
      const existingCustomerCount = yield customerRepository.count();
      if (existingCustomerCount >= 3) {
        return;
      }
      const customersData = [
        {
          id: "1",
          rideHistory: []
        },
        {
          id: "2",
          rideHistory: []
        },
        {
          id: "3",
          rideHistory: []
        },
        {
          id: "4",
          rideHistory: []
        },
        {
          id: "5",
          rideHistory: []
        }
      ];
      const queryRunner = this.dataSource.createQueryRunner();
      yield queryRunner.connect();
      yield queryRunner.startTransaction();
      try {
        for (const customerData of customersData) {
          const customer = new CustomerORM();
          customer.id = customerData.id;
          customer.rides = customerData.rideHistory;
          yield queryRunner.manager.save(customer);
        }
        yield queryRunner.commitTransaction();
        console.log("Customer seed executado com sucesso!");
      } catch (error) {
        yield queryRunner.rollbackTransaction();
        console.error("Erro ao executar seed de drivers:", error);
      } finally {
        yield queryRunner.release();
      }
    });
  }
};
CustomerSeedService = __decorateClass([
  (0, import_inversify12.injectable)(),
  __decorateParam(0, (0, import_inversify12.inject)(TYPES.DataSource))
], CustomerSeedService);

// src/seeds/ride.seed.ts
var import_inversify13 = require("inversify");
var RideSeedService = class {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }
  seedRides() {
    return __async(this, null, function* () {
      const rideRepository = this.dataSource.getRepository(RideORM);
      const customerRepository = this.dataSource.getRepository(CustomerORM);
      const driverRepository = this.dataSource.getRepository(DriverORM);
      const locationRepository = this.dataSource.getRepository(LocationORM);
      const existingRides = yield rideRepository.count();
      if (existingRides >= 5) {
        return;
      }
      const locationsData = [
        {
          id: 1,
          address: "Central Park",
          latitude: 40.785091,
          longitude: -73.968285
        },
        { id: 2, address: "Times Square", latitude: 40.758, longitude: -73.9855 }
      ];
      const existingLocations = yield locationRepository.find();
      if (existingLocations.length < locationsData.length) {
        for (const locationData of locationsData) {
          const locationOrm = new LocationORM();
          locationOrm.id = locationData.id;
          locationOrm.address = locationData.address;
          locationOrm.latitude = locationData.latitude;
          locationOrm.longitude = locationData.longitude;
          yield locationRepository.save(locationOrm);
        }
        const customers = yield customerRepository.find();
        const drivers = yield driverRepository.find();
        if (customers.length < 2 || drivers.length < 2) {
          console.error(
            "Certifique-se de ter dados suficientes em Customer e Driver antes de executar este seed."
          );
          return;
        }
        const ridesData = [
          {
            id: 1,
            distance: 10.5,
            duration: "1500s",
            value: 25,
            customer: customers[0],
            driver: drivers[0],
            origin: existingLocations[0] || (yield locationRepository.findOneBy({ id: 1 })),
            destination: existingLocations[1] || (yield locationRepository.findOneBy({ id: 2 })),
            createdAt: /* @__PURE__ */ new Date()
          },
          {
            id: 2,
            distance: 15.3,
            duration: "340s",
            value: 40,
            customer: customers[1],
            driver: drivers[1],
            origin: existingLocations[1] || (yield locationRepository.findOneBy({ id: 2 })),
            destination: existingLocations[0] || (yield locationRepository.findOneBy({ id: 1 })),
            createdAt: /* @__PURE__ */ new Date()
          }
        ];
        const queryRunner = this.dataSource.createQueryRunner();
        yield queryRunner.connect();
        yield queryRunner.startTransaction();
        try {
          for (const rideData of ridesData) {
            const rideOrm = new RideORM();
            rideOrm.id = rideData.id;
            rideOrm.distance = rideData.distance;
            rideOrm.duration = rideData.duration;
            rideOrm.value = rideData.value;
            rideOrm.createdAt = rideData.createdAt;
            rideOrm.customer = rideData.customer;
            rideOrm.driver = rideData.driver;
            rideOrm.origin = rideData.origin;
            rideOrm.destination = rideData.destination;
            yield rideRepository.save(rideOrm);
          }
          yield queryRunner.commitTransaction();
          console.log("Ride seed executado com sucesso!");
        } catch (error) {
          yield queryRunner.rollbackTransaction();
          console.error("Erro ao executar seed de rides:", error);
        } finally {
          yield queryRunner.release();
        }
      }
    });
  }
};
RideSeedService = __decorateClass([
  (0, import_inversify13.injectable)(),
  __decorateParam(0, (0, import_inversify13.inject)(TYPES.DataSource))
], RideSeedService);

// src/shared/di/container.ts
var container = new import_inversify14.Container();
function initializeDataSource() {
  return __async(this, null, function* () {
    yield createDatabaseIfNotExist();
    try {
      yield AppDataSource.initialize();
      console.log("Data Source has been initialized successfully!");
    } catch (error) {
      console.error("Error initializing Data Source:", error);
      throw error;
    }
  });
}
function createDatabaseIfNotExist() {
  return __async(this, null, function* () {
    var _a2, _b2, _c2, _d2;
    const databaseName = (_a2 = process.env.DB_NAME) != null ? _a2 : "taxi_app";
    const connection = yield import_promise.default.createConnection({
      host: (_b2 = process.env.DB_HOST) != null ? _b2 : "localhost",
      user: (_c2 = process.env.DB_USER) != null ? _c2 : "root",
      password: (_d2 = process.env.DB_PASSWORD) != null ? _d2 : ""
    });
    try {
      yield connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
      console.log(`Database '${databaseName}' checked/created.`);
    } catch (error) {
      console.error("Error creating database:", error);
      throw error;
    } finally {
      yield connection.end();
    }
  });
}
function initializeContainer() {
  return __async(this, null, function* () {
    yield initializeDataSource();
    container.bind(TYPES.DataSource).toConstantValue(AppDataSource);
    container.bind(TYPES.DriverRepository).to(DriverRepository);
    container.bind(TYPES.RideRepository).to(RideRepository);
    container.bind(TYPES.CustomerRepository).to(CustomerRepository);
    container.bind(TYPES.GoogleMapsDataSource).to(GoogleMapsDataSource);
    container.bind(TYPES.EstimateRideUseCase).to(EstimateRideUseCase);
    container.bind(TYPES.GetRideHistoryUseCase).to(GetRideHistoryUseCase);
    container.bind(TYPES.ConfirmRideUseCase).to(ConfirmRideUseCase);
    container.bind(TYPES.RideService).to(RideService);
    container.bind(TYPES.RideController).to(RideController);
    container.bind(TYPES.RideRoutes).to(RideRoutes);
    container.bind(TYPES.DriverSeedService).to(DriverSeedService);
    const driverSeedService = container.get(
      TYPES.DriverSeedService
    );
    container.bind(TYPES.CustomerSeedService).to(CustomerSeedService);
    const customerSeedService = container.get(
      TYPES.CustomerSeedService
    );
    container.bind(TYPES.RideSeedService).to(RideSeedService);
    const rideSeedService = container.get(TYPES.RideSeedService);
    yield driverSeedService.seedDrivers();
    yield customerSeedService.seedCustomer();
    yield rideSeedService.seedRides();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  container,
  initializeContainer
});
