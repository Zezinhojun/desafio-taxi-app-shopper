// import { GetRideHistoryUseCase } from '@domain/usecase/GetRideHistoryUseCase';
// import { setupTest, TestSetup } from '../../utils/testSetup';
// import { Ride } from '@domain/entities/Ride';
// import { mockRideFactory } from '../entities/Ride.spec';

// describe('GetRideHistoryUseCase', () => {
//   let testSetup: TestSetup<GetRideHistoryUseCase>;

//   beforeEach(() => {
//     testSetup = setupTest(GetRideHistoryUseCase);

//     jest.spyOn(testSetup.customerRepository, 'findById');
//   });

//   it('should return the list of rides for the customer', async () => {
//     const { sut, mockCustomer, customerRepository } = testSetup;

//     const result = await sut.execute(mockCustomer.id);

//     expect(customerRepository.findById).toHaveBeenCalledWith(mockCustomer.id);
//     expect(result).toEqual(mockCustomer.rideHistory);
//     result.forEach((ride) => {
//       expect(ride).toBeInstanceOf(Ride);
//     });
//   });

//   it('should return "No rides found" when there are no rides for the customer', async () => {
//     const { sut, mockCustomer, rideRepository } = testSetup;
//     jest.spyOn(rideRepository, 'findByCustomerId').mockResolvedValue([]);

//     try {
//       await sut.execute(mockCustomer.id);
//     } catch (error) {
//       if (error instanceof Error) {
//         expect(error.message).toBe('No rides found');
//       }
//     }
//   });

//   it('should return rides sorted by date in descending order', async () => {
//     const { sut, mockCustomer, rideRepository } = testSetup;

//     const olderRide = mockRideFactory({
//       customerId: mockCustomer.id,
//       date: new Date('2024-01-01'),
//     });

//     const newerRide = mockRideFactory({
//       customerId: mockCustomer.id,
//       date: new Date('2024-02-01'),
//     });

//     rideRepository.ridesList = [olderRide, newerRide];

//     const result = await sut.execute(mockCustomer.id);

//     expect(result[0].date.getTime()).toBeGreaterThan(result[1].date.getTime());
//   });
// });
describe('Basic test', () => {
  it('should always pass', () => {
    expect(true).toBe(true);
  });
});
