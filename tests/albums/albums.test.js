import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';
import albums from '../../lib/albums.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

describe('Albums', () => {
  let response = null;

  beforeAll(async () => {
    response = await albums.getAlbums();
  });

  test('should return http status code 200', () => {
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
  });

  test('should return content-type header', () => {
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  test('should return response body', () => {
    expect(response.data).toHaveLength(100);
  });

  test('should have valid JSON schema', () => {
    const ajv = new Ajv({ status: true, logger: console, allErrors: true, verbose: true });

    const jsonPath = path.resolve(path.join('.', 'data', 'jsonSchema', 'albums', 'albums.json'));
    const jsonSchema = JSON.parse(fs.readFileSync(jsonPath));

    const isValid = ajv.validate(jsonSchema, response.data);
    const errorMessage = getAjvErrors(ajv.errors);

    expect(isValid).toBeValid(errorMessage);
  });
});
