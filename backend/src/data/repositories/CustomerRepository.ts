import { CustomerORM } from '@data/datasources/entities/Customer';
import { Customer } from '@domain/entities/Customer';
import { Driver } from '@domain/entities/Driver';
import { Location } from '@domain/entities/Location';
import { Review } from '@domain/entities/Review';
import { Ride } from '@domain/entities/Ride';
import { Vehicle } from '@domain/entities/Vehicle';
import { ICustomerRepository } from '@domain/interfaces/ICustomerRepository';
import { TYPES } from '@shared/di/Types';
import { inject, injectable } from 'inversify';
import { DataSource, Repository } from 'typeorm';

@injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    @inject(TYPES.DataSource)
    private readonly dataSource: DataSource,
  ) { }

  private get customerRepository(): Repository<CustomerORM> {
    return this.dataSource.getRepository(CustomerORM);
  }

  async findById(customerId: string): Promise<Customer> {
    const customerOrm = await this.customerRepository.findOne({
      where: { id: customerId },
      relations: [
        'rides',
        'rides.customer',
        'rides.origin',
        'rides.destination',
        'rides.driver',
        'rides.driver.vehicle',
        'rides.driver.reviews',
      ],
    });

    if (!customerOrm) {
      throw new Error('Customer not found');
    }

    const customerMapper = customerOrm.rides.map(
      (ride) =>
        new Ride({
          id: ride.id,
          date: ride.createdAt,
          customerId: ride.customer.id,
          value: ride.value,
          origin: new Location({
            address: ride.origin.address,
            latitude: ride.origin.latitude,
            longitude: ride.origin.longitude,
          }),
          destination: new Location({
            address: ride.destination.address,
            latitude: ride.destination.latitude,
            longitude: ride.destination.longitude,
          }),
          duration: ride.duration,
          driver: new Driver({
            id: ride.driver.id,
            name: ride.driver.name,
            description: ride.driver.description,
            minimumDistance: ride.driver.minimumDistance,
            vehicle: new Vehicle({
              id: ride.driver.vehicle.id,
              model: ride.driver.vehicle.model,
              description: ride.driver.vehicle.description,
            }),
            ratePerKm: ride.driver.ratePerKm,
            reviews: ride.driver.reviews.map(
              (review) =>
                new Review({
                  id: review.id,
                  rating: review.rating,
                  comment: review.comment,
                }),
            ),
          }),
          distance: ride.distance,
        }),
    );

    return new Customer({
      id: customerOrm.id,
      rideHistory: customerMapper,
    });
  }
}
