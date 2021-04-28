import Ajv from 'ajv';
import faker from 'faker';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import posts from '../../lib/posts.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

describe('Patch post', () => {
  let response = null;
  let postBodyBeforeUpdate = null;

  const title = faker.lorem.words();

  beforeAll(async () => {
    const allPosts = await posts.getPosts();
    const post = _.sample(allPosts.data.map(post => post));

    postBodyBeforeUpdate = {
      id: post.id,
      userId: post.userId,
      title: post.title,
      body: post.body,
    };

    response = await posts.patchPost(post.id, { title });
  });

  test('should return http status code 200', () => {
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
  });

  test('should get content-type header', () => {
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  test('should get correct post title', () => {
    expect(response.data.title).toBe(title);
    expect(response.data.title).not.toBe(postBodyBeforeUpdate.title);
  });

  test('should get correct post body', () => {
    expect(response.data.body).toBe(postBodyBeforeUpdate.body);
  });

  test('should get correct post userId', () => {
    expect(response.data.userId).toBe(postBodyBeforeUpdate.userId);
  });

  test('should get correct post id', () => {
    expect(response.data.id).toBe(postBodyBeforeUpdate.id);
  });

  test('should have valid JSON schema', () => {
    const ajv = new Ajv({ status: true, logger: console, allErrors: true, verbose: true });

    const jsonPath = path.resolve(path.join('.', 'data', 'jsonSchema', 'posts', 'patchPost.json'));
    const jsonSchema = JSON.parse(fs.readFileSync(jsonPath));

    const isValid = ajv.validate(jsonSchema, response.data);
    const errorMessage = getAjvErrors(ajv.errors);

    expect(isValid).toBeValid(errorMessage);
  });
});
