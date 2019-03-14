import app from "../../index";
import * as request from 'supertest';


describe('User Controller', () => {
  beforeAll(async (done) => {
    await app.connection.createConnection();
    done();
  });
  it('Login user registed', async (done) => {
    let result = await request(app.server).get('/users')
    expect(result.status).toBe(200);
    expect(result.body[0]).toHaveProperty('name');
    done();
  })
});