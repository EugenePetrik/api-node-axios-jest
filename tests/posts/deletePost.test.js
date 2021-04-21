import Ajv from 'ajv';
import Posts from '../../lib/posts.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

import '../../utils/getRandomArrayItem';

const deletePostSchema = require('../../data/jsonSchema/posts/deletePost');

describe('Delete post', () => {
  let response = null;

  beforeAll(async () => {
    const postId = await Posts.getPosts().then(response => {
      return response.data.map(({ id }) => id).sample();
    });

    response = await Posts.deletePost(postId);
  });

  test('should return http status code 200', async () => {
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
  });

  test('should get content-type header', async () => {
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  test('should get empty response body', async () => {
    expect(Object.keys(response.data)).toHaveLength(0);
    expect(JSON.stringify(response.data)).toBe('{}');
  });

  test('should have valid JSON schema', async () => {
    const ajv = new Ajv({ status: true, logger: console, allErrors: true, verbose: true });

    const valid = ajv.validate(deletePostSchema, response.data);
    const errorMessage = getAjvErrors(ajv.errors);

    expect(valid).toBeValid(errorMessage);
  });
});
