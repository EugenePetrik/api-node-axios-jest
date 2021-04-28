import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import albums from '../../lib/albums.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

describe('Album photos', () => {
  let response = null;
  let albumId = null;

  beforeAll(async () => {
    const albumIds = await albums.getAlbums();
    albumId = _.sample(albumIds.data.map(({ id }) => id));
    response = await albums.getAlbumPhotos(albumId);
  });

  test('should return http status code 200', () => {
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
  });

  test('should return content-type header', () => {
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  test(`album with id ${albumId} should have 50 photos`, () => {
    expect(response.data).toHaveLength(50);
  });

  test('each photo should contain correct album id', () => {
    const isContainCorrectAlbumId = response.data.every(({ albumId }) => albumId === albumId);
    expect(isContainCorrectAlbumId).toBe(true);
  });

  test('should have valid JSON schema', () => {
    const ajv = new Ajv({ status: true, logger: console, allErrors: true, verbose: true });

    const jsonPath = path.resolve(path.join('.', 'data', 'jsonSchema', 'albums', 'albumPhotos.json'));
    const jsonSchema = JSON.parse(fs.readFileSync(jsonPath));

    const isValid = ajv.validate(jsonSchema, response.data);
    const errorMessage = getAjvErrors(ajv.errors);

    expect(isValid).toBeValid(errorMessage);
  });
});
