const request = require('supertest');
const app = require('./app');

describe('API Health Check', () => {
  it('should return 200 OK for health check endpoint', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Antigravity CMS API is running');
  });

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/api/v1/unknown-route');
    expect(res.statusCode).toEqual(404);
    expect(res.body.success).toBe(false);
  });
});
