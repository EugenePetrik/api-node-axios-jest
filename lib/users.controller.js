import axios from 'axios';

class Users {
  url = process.env.JSON_PLACEHOLDER_API;

  headers = {
    'Content-type': 'application/json; charset=UTF-8'
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
}

export default new Users();
