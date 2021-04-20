import Ajv from 'ajv';
import Posts from '../../lib/posts.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

import '../../utils/getRandomArrayItem';

const postCommentsSchema = require('../../data/jsonSchema/posts/postComments');

describe('JSON Placeholder', () => {
  let response = null;
  let postId = null;

  describe('Post comments', () => {
    beforeAll(async () => {
      postId = await Posts.getPosts().then((response) => {
        return response.data.map(({ id }) => id).sample();
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

      const valid = ajv.validate(postCommentsSchema, response.data);
      const errorMessage = getAjvErrors(ajv.errors);

      expect(valid).toBeValid(errorMessage);
    });
  });
});
