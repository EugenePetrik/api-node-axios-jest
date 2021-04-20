import Ajv from 'ajv';
import Users from '../../lib/users.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

const usersSchema = require('../../data/jsonSchema/users/users');

describe('Users', () => {
  let response = null;

  beforeAll(async () => {
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

  test('should have valid JSON schema', async () => {
    const ajv = new Ajv({ status: true, logger: console, allErrors: true, verbose: true });

    const valid = ajv.validate(usersSchema, response.data);
    const errorMessage = getAjvErrors(ajv.errors);

    expect(valid).toBeValid(errorMessage);
  });
});
