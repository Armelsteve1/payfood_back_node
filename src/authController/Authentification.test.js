const { createUser, loginUser, getUser } = require('./Authentification');

describe('User Creation', () => {
    it('should create a new user', async () => {
        const userData = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        };

        const createdUser = await createUser(userData);
        expect(createdUser).toBeDefined();
        expect(createdUser.username).toBe(userData.username);
        expect(createdUser.email).toBe(userData.email);
    });

});

describe('User Authentication', () => {
    it('should return a JWT token for valid credentials', async () => {
        const userData = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        };
        await createUser(userData);
        const credentials = {
            username: 'testuser',
            password: 'password123'
        };
        const token = await loginUser(credentials);

        expect(token).toBeDefined();
    });

    it('should throw an error for invalid credentials', async () => {
        const credentials = {
            username: 'invaliduser',
            password: 'invalidpassword'
        };

        await expect(loginUser(credentials)).rejects.toThrow('Failed to login');
    });
});

describe('User Retrieval', () => {
    it('should return undefined for non-existent user', async () => {
        const username = 'nonexistentuser';
        const userData = await getUser(username);

        expect(userData).toBeUndefined();
    });
});
