import Ajv from 'ajv';
import faker from 'faker';
import Users from '../../lib/users.controller';
import Posts from '../../lib/posts.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

import '../../utils/getRandomArrayItem';

const createPostSchema = require('../../data/jsonSchema/posts/updatePost');

describe('Update post', () => {
  let response = null;
  let userId = null;
  let postId = null;

  const title = faker.lorem.words();
  const body = faker.lorem.sentence();

  beforeAll(async () => {
    userId = await Users.getUsers().then(response => {
      return response.data.map(({ id }) => id).sample();
    });

    postId = await Posts.getPosts().then(response => {
      return response.data.map(({ id }) => id).sample();
    });

    response = await Posts.updatePost(postId, { title, body, userId });
  });

  test('should return http status code 200', async () => {
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
  });

  test('should get content-type header', async () => {
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  test('should get correct post title', async () => {
    expect(response.data.title).toBe(title);
  });

  test('should get correct post body', async () => {
    expect(response.data.body).toBe(body);
  });

  test('should get correct post userId', async () => {
    expect(response.data.userId).toBe(userId);
  });

  test('should get correct post id', async () => {
    expect(response.data.id).toBe(postId);
  });

  test('should have valid JSON schema', async () => {
    const ajv = new Ajv({ status: true, logger: console, allErrors: true, verbose: true });

    const valid = ajv.validate(createPostSchema, response.data);
    const errorMessage = getAjvErrors(ajv.errors);

    expect(valid).toBeValid(errorMessage);
  });
});
