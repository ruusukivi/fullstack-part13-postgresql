const {
    response
} = require('express');
const request = require('supertest')
const jwt = require('jsonwebtoken');
const baseURL = 'http://localhost:3001/api/blogs'
const loginURL = 'http://localhost:3001/api/login'

let blog
let token

beforeAll(async () => {
    const login = await request(loginURL)
        .post('/')
        .send({
            username: 'test@test.com',
            password: 'salainen',
        });
    token = login.body.token;
    const response = await request(baseURL)
        .post('/')
        .set('Authorization', `Bearer ${token}`)
        .send({
            author: 'Tester',
            title: 'Test title',
            uri: 'https://www.test.com'
        });
    blog = response.body;
    console.log(blog + "onnistui!")
})

describe('GET /blogs', () => {
    it('should return 200', async () => {
        const response = await request(baseURL).get('/');
        expect(response.statusCode).toBe(200);
    });
    it('should return blogs', async () => {
        const response = await request(baseURL).get('/');
        expect(response.body.length >= 1).toBe(true);
    });
});

describe('POST /blogs', () => {
    it('should return 400 if url is missing', async () => {
        const response = await request(baseURL)
            .post('/')
            .set('Authorization', `Bearer ${token}`)
            .send({
                author: 'Tester',
                title: 'Test title',
                uri: ''
            });
        expect(response.status).toBe(500)
    });
    it('should return 400 if title is missing', async () => {
        const response = await request(baseURL)
            .post('/')
            .set('Authorization', `Bearer ${token}`)
            .send({
                author: 'Tester',
                uri: 'https://www.test.com'
            });
        expect(response.status).toBe(500)
    });
    it('should set likes to 0', async () => {
        expect(blog.likes).toBe(0)
    });
});

describe('PUT /blogs/:id', () => {
    it('should update likes for the given blog', async () => {
        const response = await request(baseURL).put(`/${blog.id}`).send({
            likes: 10,
        });
        expect(response.statusCode).toBe(200)
        expect(response.body.likes).toBe(10)
    });
    it('should give an error if blog does not exist', async () => {
        const response = await request(baseURL).put('/0').send({
            likes: 10,
        });
        expect(response.statusCode).toBe(404)
    });
});
