import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import Posts from '../../lib/posts.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

describe('Post comments', () => {
  let response = null;
  let postId = null;

  beforeAll(async () => {
    postId = await Posts.getPosts().then(response => {
      return _.sample(response.data.map(({ id }) => id));
    });

    response = await Posts.getPostComments(postId);
  });

  test('should return http status code 200', async () => {
    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
  });

  test('should return content-type header', async () => {
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
  });

  test(`post with id ${postId} should have 5 comments`, async () => {
    expect(response.data).toHaveLength(5);
  });

  test('each comment should contain correct post id', async () => {
    const isContainCorrectAlbumId = response.data.every(({ postId }) => postId === postId);
    expect(isContainCorrectAlbumId).toBe(true);
  });

  test('should have valid JSON schema', async () => {
    const ajv = new Ajv({ status: true, logger: console, allErrors: true, verbose: true });

    const jsonPath = path.resolve(path.join('.', 'data', 'jsonSchema', 'posts', 'postComments.json'));
    const jsonSchema = JSON.parse(fs.readFileSync(jsonPath));

    const valid = ajv.validate(jsonSchema, response.data);
    const errorMessage = getAjvErrors(ajv.errors);

    expect(valid).toBeValid(errorMessage);
  });
});
