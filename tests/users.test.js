import Users from '../api/users.controller';

describe('JSON Placeholder', () => {
  describe('Users', () => {
    let response = null;

    beforeEach(async () => {
      response = await Users.getUsers();
    });

    test('should return http status code 200', async () => { 
      expect(response.status).toBe(200);
      expect(response.statusText).toBe('OK');
    });
  
    test('should return content-type header', async () => {
      expect(response.headers['content-type']).not.toBeUndefined();
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });
  
    test('should return response body', async () => {
      expect(response.data.length).toBeGreaterThan(0);
    });
  });
});
