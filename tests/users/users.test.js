import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';
import users from '../../lib/users.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

describe('Users', () => {
  let response = null;

  beforeAll(async () => {
    response = await users.getUsers();
  });

  test('should return http status code 200', () => {
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
  });

  test('should return content-type header', () => {
    expect(response.headers['content-type']).not.toBeUndefined();
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  test('should return response body', () => {
    expect(response.data.length).toBeGreaterThan(0);
  });

  test('should have valid JSON schema', () => {
    const ajv = new Ajv({ status: true, logger: console, allErrors: true, verbose: true });

    const jsonPath = path.resolve(path.join('.', 'data', 'jsonSchema', 'users', 'users.json'));
    const jsonSchema = JSON.parse(fs.readFileSync(jsonPath));

    const isValid = ajv.validate(jsonSchema, response.data);
    const errorMessage = getAjvErrors(ajv.errors);

    expect(isValid).toBeValid(errorMessage);
  });
});
