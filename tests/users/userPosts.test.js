import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import Users from '../../lib/users.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

describe('User posts', () => {
  let response = null;
  let userId = null;

  beforeAll(async () => {
    userId = await Users.getUsers().then(response => {
      return _.sample(response.data.map(({ id }) => id));
    });

    response = await Users.getUserPosts(userId);
  });

  test('should return http status code 200', async () => {
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
  });

  test('should return content-type header', async () => {
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  test(`user with id ${userId} should have 10 posts`, async () => {
    expect(response.data).toHaveLength(10);
  });

  test('each post should contain correct user id', async () => {
    const isContainCorrectUserId = response.data.every(({ userId }) => userId === userId);
    expect(isContainCorrectUserId).toBe(true);
  });

  test('should have valid JSON schema', async () => {
    const ajv = new Ajv({ status: true, logger: console, allErrors: true, verbose: true });

    const jsonPath = path.resolve(path.join('.', 'data', 'jsonSchema', 'users', 'userPosts.json'));
    const jsonSchema = JSON.parse(fs.readFileSync(jsonPath));

    const valid = ajv.validate(jsonSchema, response.data);
    const errorMessage = getAjvErrors(ajv.errors);

    expect(valid).toBeValid(errorMessage);
  });
});
