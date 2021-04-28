import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import posts from '../../lib/posts.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

describe('Delete post', () => {
  let response = null;

  beforeAll(async () => {
    const postIds = await posts.getPosts();
    const postId = _.sample(postIds.data.map(({ id }) => id));
    response = await posts.deletePost(postId);
  });

  test('should return http status code 200', () => {
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
  });

  test('should get content-type header', () => {
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  test('should get empty response body', () => {
    expect(Object.keys(response.data)).toHaveLength(0);
    expect(JSON.stringify(response.data)).toBe('{}');
  });

  test('should have valid JSON schema', () => {
    const ajv = new Ajv({ status: true, logger: console, allErrors: true, verbose: true });

    const jsonPath = path.resolve(path.join('.', 'data', 'jsonSchema', 'posts', 'deletePost.json'));
    const jsonSchema = JSON.parse(fs.readFileSync(jsonPath));

    const isValid = ajv.validate(jsonSchema, response.data);
    const errorMessage = getAjvErrors(ajv.errors);

    expect(isValid).toBeValid(errorMessage);
  });
});
