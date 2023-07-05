const { response } = require('express');
const request = require('supertest')
const baseURL = 'http://localhost:3001/api/users'

beforeAll(async () => {
    const response = await request(baseURL).get('/');
    if (response.length = 0) {
        await request(baseURL).post('/').send({
            username: 'tester',
            name: 'Test Tester',
        });
    }
})

describe('GET /users', () => {
    it('should return 200', async () => {
        const response = await request(baseURL).get('/');
        expect(response.statusCode).toBe(200);
    });
    it('should return a user with username tester', async () => {
        const response = await request(baseURL).get('/');
        expect(response.body.length >= 1).toBe(true);
    });
});

describe('POST /users', () => {
    it('should return 400 if user exits with the same username', async () => {
        const response = await request(baseURL).post('/').send({
            username: 'tester',
            name: 'Test Tester'
        });
        expect(response.status).toBe(400)
    });
    it('should return 400 if username or name is missing', async () => {
        const response = await request(baseURL).post('/').send({});
        expect(response.status).toBe(400)
    });
});

describe('PUT /users/:username', () => {
    it('should update name for given username', async () => {
        const response = await request(baseURL).put(`/tester`).send({
            name: 'Best Tester',
        });
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toBe('Best Tester');
        await request(baseURL).put(`/tester`).send({
            name: 'Test Tester',
        });
    });
    it('should give an error if user does not exist', async () => {
        const response = await request(baseURL).put('/nouser').send({
            name: 'No User',
        });
        expect(response.statusCode).toBe(400)
    });
});