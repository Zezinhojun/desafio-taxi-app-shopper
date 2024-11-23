// import { RideController } from "@presentation/controllers/RideController";
// import { Request, Response } from "express";
// import { TestSetup, setupTest } from "../../utils/testSetup";

// describe('RideController', () => {

//     let testSetup: TestSetup<RideController>;

//     beforeEach(() => {
//         testSetup = setupTest(RideController, true);
//     });

//     const mockResponse = () => {
//         const res = {} as Response;
//         res.status = jest.fn().mockReturnValue(res);
//         res.json = jest.fn().mockReturnValue(res);
//         return res;
//     };

//     const mockRequest = (body = {}, params = {}) => ({
//         body, params
//     }) as Request

//     it('should estimate the ride correctly', async () => {
//         const { sut, mockCustomer, mockDriver, mockRide, googleMapsDataSource, mockLocation } = testSetup;
//         const mockRideData = {
//             customer_id: mockCustomer.id,
//             origin: "Rua 1",
//             destination: "Rua 2"
//         };

//         console.log(mockDriver)

//         if (googleMapsDataSource) {
//             googleMapsDataSource.geocodeAddress = jest
//                 .fn()
//                 .mockImplementation(async () => mockLocation);
//             googleMapsDataSource.calculateRote = jest.fn().mockResolvedValue({
//                 distance: 1000,
//                 duration: '15m',
//                 polyline: 'mock-polyline',
//                 originalResponse: {},
//             });
//         }

//         // Calling the controller method with the mock request
//         const req = mockRequest(mockRideData);
//         const res = mockResponse();

//         await sut.estimateRide(req, res);

//         // Checking if the response was called with status 200 and the correct data
//         expect(res.status).toHaveBeenCalledWith(200);
//     });

// })
