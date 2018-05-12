const request = require('supertest');
const app = require('../../server');

// Util for authenticated routes
let createAuthenticatedRequest = (server, loginDetails, done) => {
    let authenticatedRequest = request.agent(server);
    authenticatedRequest
        .post('/signin')
        .send(loginDetails)
        .end(function (error, response) {
            try {
                done(authenticatedRequest)
            }
            catch (error) {
                throw error;
            }
        });
}

describe('Test the test path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/test');
        expect(response.statusCode).toBe(200);
    });
});


describe('Test the root path', () => {
    const testEmail = "test@test.com";
    const testPassword = "test";
    let testUser = {
        email: testEmail,
        password: testPassword,
    }
    test('It should respond unauthorized', async () => {
        const response = await request(app).get('/');
        expect(response.text).toBe('Unauthorized');
    })
    test('It should respond with a 200 status code after authorization', () => {
        createAuthenticatedRequest(app, testUser, function (request) {
            const response = request.get('/').expect(200);
        })
    });
});