import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';
import Comments from '../../lib/comments.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

describe('Comments', () => {
  let response = null;

  beforeAll(async () => {
    response = await Comments.getComments();
  });

  test('should return http status code 200', async () => {
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
  });

  test('should return content-type header', async () => {
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  test('should return response body', async () => {
    expect(response.data).toHaveLength(500);
  });

  test('should have valid JSON schema', async () => {
    const ajv = new Ajv({ status: true, logger: console, allErrors: true, verbose: true });

    const jsonPath = path.resolve(path.join('.', 'data', 'jsonSchema', 'comments', 'comments.json'));
    const jsonSchema = JSON.parse(fs.readFileSync(jsonPath));

    const valid = ajv.validate(jsonSchema, response.data);
    const errorMessage = getAjvErrors(ajv.errors);

    expect(valid).toBeValid(errorMessage);
  });
});