import Ajv from 'ajv';
import Posts from '../../lib/posts.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

import '../../utils/getRandomArrayItem';

const getPostSchema = require('../../data/jsonSchema/posts/getPost');

describe('Get post', () => {
  let response = null;
  let post = {};

  beforeAll(async () => {
    post = await Posts.getPosts().then(response => {
      const postData = response.data.map((post) => post).sample();

      return {
        id: postData.id,
        userId: postData.userId,
        title: postData.title,
        body: postData.body,
      };
    });

    response = await Posts.getPost(post.id);
  });

  test('should return http status code 200', async () => {
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
  });

  test('should get content-type header', async () => {
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  test('should get correct post title', async () => {
    expect(response.data.title).toBe(post.title);
  });

  test('should get correct post body', async () => {
    expect(response.data.body).toBe(post.body);
  });

  test('should get correct post userId', async () => {
    expect(response.data.userId).toBe(post.userId);
  });

  test('should get correct post id', async () => {
    expect(response.data.id).toBe(post.id);
  });

  test('should have valid JSON schema', async () => {
    const ajv = new Ajv({ status: true, logger: console, allErrors: true, verbose: true });

    const valid = ajv.validate(getPostSchema, response.data);
    const errorMessage = getAjvErrors(ajv.errors);

    expect(valid).toBeValid(errorMessage);
  });
});