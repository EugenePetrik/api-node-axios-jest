import Ajv from 'ajv';
import Albums from '../../lib/albums.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

const albumsSchema = require('../../data/jsonSchema/albums/albums');

describe('JSON Placeholder', () => {
  let response = null;

  describe('Albums', () => {
    beforeAll(async () => {
      response = await Albums.getAlbums();
    });

    test('should return http status code 200', async () => {
      expect(response.status).toBe(200);
      expect(response.statusText).toBe('OK');
    });
  
    test('should return content-type header', async () => {
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });
  
    test('should return response body', async () => {
      expect(response.data).toHaveLength(100);
    });

    test('should have valid JSON schema', async () => {
      const ajv = new Ajv({ status: true, logger: console, allErrors: true, verbose: true });

      const valid = ajv.validate(albumsSchema, response.data);
      const errorMessage = getAjvErrors(ajv.errors);

      expect(valid).toBeValid(errorMessage);
    });
  });
});
