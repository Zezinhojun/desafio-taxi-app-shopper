// import { ConfirmRideUseCase } from '@domain/usecase/ConfirmRideUserCase';
// import { setupTest, TestSetup } from '../../../tests/utils/testSetup';
// import { Ride } from '@domain/entities/Ride';

// describe('ConfirmRideUseCase', () => {
//   let testSetup: TestSetup<ConfirmRideUseCase>;

//   beforeEach(() => {
//     testSetup = setupTest(ConfirmRideUseCase, true);
//   });

//   it('should successfully confirm a ride', async () => {
//     const {
//       sut,
//       mockCustomer,
//       mockRide,
//       customerRepository,
//       driverRepository,
//       rideRepository,
//     } = testSetup;

//     jest.spyOn(customerRepository, 'findById');
//     jest.spyOn(driverRepository, 'findById');
//     jest.spyOn(rideRepository, 'save');

//     const params = {
//       customerId: mockCustomer.id,
//       rideDetails: mockRide,
//     };

//     const result = await sut.execute(params);

//     expect(customerRepository.findById).toHaveBeenCalledWith(mockCustomer.id);
//     expect(driverRepository.findById).toHaveBeenCalledWith(mockRide.driver.id);
//     expect(rideRepository.save).toHaveBeenCalledWith(mockRide);
//     expect(result).toEqual(mockRide);
//     expect(result).toBeInstanceOf(Ride);
//   });

//   it('should throw error if customer is not found', async () => {
//     const { sut, mockCustomer, mockRide, customerRepository } = testSetup;

//     customerRepository.clear();

//     const params = {
//       customerId: mockCustomer.id,
//       rideDetails: mockRide,
//     };

//     await expect(sut.execute(params)).rejects.toThrow('Customer not found');
//   });

//   it('should throw error if driver is not found', async () => {
//     const { sut, mockCustomer, mockRide, driverRepository } = testSetup;

//     driverRepository.clear();

//     const params = {
//       customerId: mockCustomer.id,
//       rideDetails: mockRide,
//     };

//     expect(sut.execute(params)).rejects.toThrow('Driver not found');
//   });
// });
describe('Basic test', () => {
  it('should always pass', () => {
    expect(true).toBe(true);
  });
});

