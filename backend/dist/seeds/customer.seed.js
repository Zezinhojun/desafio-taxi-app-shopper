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

// src/seeds/customer.seed.ts
var customer_seed_exports = {};
__export(customer_seed_exports, {
  CustomerSeedService: () => CustomerSeedService
});
module.exports = __toCommonJS(customer_seed_exports);

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

// src/seeds/customer.seed.ts
var import_inversify = require("inversify");
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
  (0, import_inversify.injectable)(),
  __decorateParam(0, (0, import_inversify.inject)(TYPES.DataSource))
], CustomerSeedService);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomerSeedService
});
