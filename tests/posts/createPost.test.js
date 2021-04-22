import Ajv from 'ajv';
import faker from 'faker';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import Users from '../../lib/users.controller';
import Posts from '../../lib/posts.controller';
import { getAjvErrors } from '../../utils/getAjvErrors';

describe('Create post', () => {
  let response = null;
  let userId = null;

  const title = faker.lorem.words();
  const body = faker.lorem.sentence();

  beforeAll(async () => {
    userId = await Users.getUsers().then(response => {
      return _.sample(response.data.map(({ id }) => id));
    });

    response = await Posts.createPosts({ title, body, userId });
  });

  test('should return http status code 201', async () => {
    expect(response.status).toBe(201);
    expect(response.statusText).toBe('Created');
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

  test('should have valid JSON schema', async () => {
    const ajv = new Ajv({ status: true, logger: console, allErrors: true, verbose: true });

    const jsonPath = path.resolve(path.join('.', 'data', 'jsonSchema', 'posts', 'createPost.json'));
    const jsonSchema = JSON.parse(fs.readFileSync(jsonPath));

    const valid = ajv.validate(jsonSchema, response.data);
    const errorMessage = getAjvErrors(ajv.errors);

    expect(valid).toBeValid(errorMessage);
  });
});
