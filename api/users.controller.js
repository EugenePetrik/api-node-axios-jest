import axios from 'axios';

class Users {
  url = process.env.TYPECODE_API;

  async getUsers() {
    return await axios.get(`${this.url}/users`);
  }
}

export default new Users();
