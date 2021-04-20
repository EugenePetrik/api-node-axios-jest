import Ajv from 'ajv';
import Albums from '../../lib/albums.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

import '../../utils/getRandomArrayItem';

const albumPhotosSchema = require('../../data/jsonSchema/albums/albumPhotos');

describe('JSON Placeholder', () => {
  let response = null;
  let albumId = null;

  describe('Album photos', () => {
    beforeAll(async () => {
      albumId = await Albums.getAlbums().then((response) => {
        return response.data.map(({ id }) => id).sample();
      });

      response = await Albums.getAlbumPhotos(albumId);
    });

    test('should return http status code 200', async () => { 
      expect(response.status).toBe(200);
      expect(response.statusText).toBe('OK');
    });

    test('should return content-type header', async () => {
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });
  
    test(`album with id ${albumId} should have 50 photos`, async () => {
      expect(response.data).toHaveLength(50);
    });

    test('each photo should contain correct album id', async () => {
      const isContainCorrectAlbumId = response.data.every(({ albumId }) => albumId === albumId);
      expect(isContainCorrectAlbumId).toBe(true);
    });

    test('should have valid JSON schema', async () => {
      const ajv = new Ajv({ status: true, logger: console, allErrors: true, verbose: true });

      const valid = ajv.validate(albumPhotosSchema, response.data);
      const errorMessage = getAjvErrors(ajv.errors);

      expect(valid).toBeValid(errorMessage);
    });
  });
});