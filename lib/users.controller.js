import axios from 'axios';

class Users {
  url = process.env.JSON_PLACEHOLDER_API;

  async getUsers() {
    return await axios.get(`${this.url}/users`);
  }

  async getUserAlbums(userId) {
    return await axios.get(`${this.url}/users/${userId}/albums`);
  }
}

export default new Users();
