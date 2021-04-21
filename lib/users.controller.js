import axios from 'axios';
import { CONFIG } from '../config/env';

class Users {
  url = CONFIG.JSON_PLACEHOLDER_API;

  headers = {
    'Content-type': 'application/json; charset=UTF-8',
  };

  async getUsers() {
    return await axios.get(`${this.url}/users`, {
      headers: this.headers,
    });
  }

  async getUserAlbums(userId) {
    return await axios.get(`${this.url}/users/${userId}/albums`, {
      headers: this.headers,
    });
  }

  async getUserTodos(userId) {
    return await axios.get(`${this.url}/users/${userId}/todos`, {
      headers: this.headers,
    });
  }

  async getUserPosts(userId) {
    return await axios.get(`${this.url}/users/${userId}/posts`, {
      headers: this.headers,
    });
  }
}

export default new Users();
