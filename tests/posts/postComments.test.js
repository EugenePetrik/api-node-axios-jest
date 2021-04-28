import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import posts from '../../lib/posts.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

describe('Post comments', () => {
  let response = null;
  let postId = null;

  beforeAll(async () => {
    const postIds = await posts.getPosts();
    postId = _.sample(postIds.data.map(({ id }) => id));
    response = await posts.getPostComments(postId);
  });

  test('should return http status code 200', () => {
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
  });

  test('should return content-type header', () => {
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  test(`post with id ${postId} should have 5 comments`, () => {
    expect(response.data).toHaveLength(5);
  });

  test('each comment should contain correct post id', () => {
    const isContainCorrectAlbumId = response.data.every(({ postId }) => postId === postId);
    expect(isContainCorrectAlbumId).toBe(true);
  });

  test('should have valid JSON schema', () => {
    const ajv = new Ajv({ status: true, logger: console, allErrors: true, verbose: true });

    const jsonPath = path.resolve(path.join('.', 'data', 'jsonSchema', 'posts', 'postComments.json'));
    const jsonSchema = JSON.parse(fs.readFileSync(jsonPath));

    const isValid = ajv.validate(jsonSchema, response.data);
    const errorMessage = getAjvErrors(ajv.errors);

    expect(isValid).toBeValid(errorMessage);
  });
});
