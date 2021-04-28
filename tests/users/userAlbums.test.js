import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import users from '../../lib/users.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

describe('User albums', () => {
  let response = null;
  let userId = null;

  beforeAll(async () => {
    const userIds = await users.getUsers();
    userId = _.sample(userIds.data.map(({ id }) => id));
    response = await users.getUserAlbums(userId);
  });

  test('should return http status code 200', () => {
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
  });

  test('should return content-type header', () => {
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  test(`user with id ${userId} should have 10 albums`, () => {
    expect(response.data).toHaveLength(10);
  });

  test('each album should contain correct user id', () => {
    const isContainCorrectUserId = response.data.every(({ userId }) => userId === userId);
    expect(isContainCorrectUserId).toBe(true);
  });

  test('should have valid JSON schema', () => {
    const ajv = new Ajv({ status: true, logger: console, allErrors: true, verbose: true });

    const jsonPath = path.resolve(path.join('.', 'data', 'jsonSchema', 'users', 'userAlbums.json'));
    const jsonSchema = JSON.parse(fs.readFileSync(jsonPath));

    const isValid = ajv.validate(jsonSchema, response.data);
    const errorMessage = getAjvErrors(ajv.errors);

    expect(isValid).toBeValid(errorMessage);
  });
});
