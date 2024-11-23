import { Customer, CustomerParams } from '@domain/entities/Customer';
import { faker } from '@faker-js/faker/.';
import { mockRideFactory } from './Ride.spec';

export const mockCustomerFactory = (
  overrides: Partial<CustomerParams> = {},
): Customer => {
  const rideHistory = Array.from(
    { length: faker.number.int({ min: 5, max: 15 }) },
    () => mockRideFactory(),
  );
  const customerParams = {
    id: faker.string.uuid(),
    rideHistory: rideHistory,
    ...overrides,
  };

  return new Customer(customerParams);
};

describe('Customer', () => {
  let customer: Customer;

  beforeEach(() => {
    customer = mockCustomerFactory();
  });

  it('should create a Customer with valid data', () => {
    expect(customer).toBeInstanceOf(Customer);
  });

  it('should return the full ride history when no driverId is provided', () => {
    const rideHistory = customer.viewHistory();
    expect(rideHistory).toEqual(customer.rideHistory);
    expect(rideHistory.length).toBe(customer.rideHistory.length);
  });

  it('should filter the ride history by driverId when provided', () => {
    const targetRide = mockRideFactory();
    const driverId = targetRide.driver.id;

    customer = new Customer({
      id: customer.id,
      rideHistory: [targetRide, ...customer.rideHistory],
    });

    const filteredHistory = customer.viewHistory(driverId);

    expect(filteredHistory).toHaveLength(1);
    expect(filteredHistory[0]).toEqual(targetRide);
  });
});
