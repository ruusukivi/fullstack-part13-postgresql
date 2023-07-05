const { response } = require('express');
const request = require('supertest')
const baseURL = 'http://localhost:3001/api/blogs'

let blog
beforeAll(async () => {
    const response = await request(baseURL).post('/').send({
        author: 'Tester',
        title: 'Test title',
        uri: 'https://www.test.com'
    });
    blog = response.body;
})
afterAll(async () => {
    await request(baseURL).delete(`/${blog.id}`)
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
        const response = await request(baseURL).post('/').send({
            author: 'Tester',
            title: 'Test title',
            uri: ''
        });
        expect(response.status).toBe(400)
    });
    it('should return 400 if title is missing', async () => {
        const response = await request(baseURL).post('/').send({
            author: 'Tester',
            uri: 'https://www.test.com'
        });
        expect(response.status).toBe(400)
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

describe('DELETE /blogs/:id', () => {
    it('should delete blog selected', async () => {
        const response = await request(baseURL).post('/').send({
            author: 'Tester2',
            title: 'Test title2',
            uri: 'https://www.test.com'
        });
        blog2 = response.body;
        const all = await request(baseURL).get('/');
        const afterdeletion = await request(baseURL).delete(`/${blog2.id}`)
        const deleted =  afterdeletion.body.find((item) => item.id === blog2.id)
        expect(deleted).toBe(undefined)
        expect(afterdeletion.body.length).toBe(all.body.length-1);
    });
    it('should return 404 if id is not found', async () => {
        const response  = await request(baseURL).delete(`/0`)
        console.log(response.body)
        expect(response.status).toBe(404)
    });
});