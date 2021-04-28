import axios from 'axios';
import Base from './base.controller';

class Users extends Base {
  getUsers() {
    return axios.get(`${this.url}/users`, {
      headers: this.headers,
    });
  }

  getUserAlbums(userId) {
    return axios.get(`${this.url}/users/${userId}/albums`, {
      headers: this.headers,
    });
  }

  getUserTodos(userId) {
    return axios.get(`${this.url}/users/${userId}/todos`, {
      headers: this.headers,
    });
  }

  getUserPosts(userId) {
    return axios.get(`${this.url}/users/${userId}/posts`, {
      headers: this.headers,
    });
  }
}

export default new Users();
