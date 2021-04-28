import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import posts from '../../lib/posts.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

describe('Post', () => {
  let response = null;
  let post = null;

  beforeAll(async () => {
    const allPosts = await posts.getPosts();
    post = _.sample(allPosts.data.map(post => post));
    response = await posts.getPost(post.id);
  });

  test('should return http status code 200', () => {
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
  });

  test('should get content-type header', () => {
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  test('should get correct post title', () => {
    expect(response.data.title).toBe(post.title);
  });

  test('should get correct post body', () => {
    expect(response.data.body).toBe(post.body);
  });

  test('should get correct post userId', () => {
    expect(response.data.userId).toBe(post.userId);
  });

  test('should get correct post id', () => {
    expect(response.data.id).toBe(post.id);
  });

  test('should have valid JSON schema', () => {
    const ajv = new Ajv({ status: true, logger: console, allErrors: true, verbose: true });

    const jsonPath = path.resolve(path.join('.', 'data', 'jsonSchema', 'posts', 'getPost.json'));
    const jsonSchema = JSON.parse(fs.readFileSync(jsonPath));

    const isValid = ajv.validate(jsonSchema, response.data);
    const errorMessage = getAjvErrors(ajv.errors);

    expect(isValid).toBeValid(errorMessage);
  });
});
