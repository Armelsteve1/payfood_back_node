const restaurantController = require('./restaurantController');

describe('Restaurant Controller', () => {
    const mockRequest = (body, params) => ({
        body,
        params
    });

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    describe('getAllRestaurants', () => {
        it('should get all restaurants', async () => {
            const req = mockRequest();
            const res = mockResponse();
            await restaurantController.getAllRestaurants(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
        });
    });

    describe('getRestaurantById', () => {
        it('should get restaurant by ID', async () => {
            const req = mockRequest(null, { id: 'rest01' });
            const res = mockResponse();
            await restaurantController.getRestaurantById(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
        });
    });

    describe('createRestaurant', () => {
        it('should create a new restaurant', async () => {
            const req = mockRequest({ id: 'rest08', name: 'Restaurant Test' });
            const res = mockResponse();
            await restaurantController.createRestaurant(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalled();
        });
    });
    

    describe('updateRestaurant', () => {
        it('should update restaurant by ID', async () => {
            const req = mockRequest({ id: 'rest08', name: 'Restaurant Updated' }, { id: 'rest08' });
            const res = mockResponse();
            await restaurantController.updateRestaurant(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
        });
    });

    describe('deleteRestaurant', () => {
        it('should delete restaurant by ID', async () => {
            const req = mockRequest(null, { id: 'rest08' });
            const res = mockResponse();
            await restaurantController.deleteRestaurant(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
        });
    });
});
