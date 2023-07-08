const { response } = require('express');
const request = require('supertest')
const baseURL = 'http://localhost:3001/api/login'
const usersURL = 'http://localhost:3001/api/users'

beforeAll(async () => {
    const response = await request(usersURL).get('/');
    if (response.length = 0) {
        await request(usersURL).post('/').send({
            username: 'tester@tester.com',
            name: 'Test Tester',
        });
    }
})

describe('POST /login', () => {
    it('should return 401 if username is not correct', async () => {
        const response = await request(baseURL).post('/').send({
            username: 'tester',
            password: 'salainen'
        })
        expect(response.status).toBe(401)
    })
    it('should return 401 if password is not correct', async () => {
        const response = await request(baseURL).post('/').send({
            username: 'tester@tester.com',
            password: 'salaine'
        })
        expect(response.status).toBe(401)
    })
    it('should return 200 login succeeds', async () => {
        const response = await request(baseURL).post('/').send({
            username: 'tester@tester.com',
            password: 'salainen'
        })
        expect(response.status).toBe(200)
    })
})
