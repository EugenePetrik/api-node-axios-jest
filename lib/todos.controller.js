import axios from 'axios';
import { CONFIG } from '../config/env';

class Todos {
  url = CONFIG.JSON_PLACEHOLDER_API;

  headers = {
    'Content-type': 'application/json; charset=UTF-8',
  };

  async getTodos() {
    return await axios.get(`${this.url}/todos`, {
      headers: this.headers,
    });
  }
}

export default new Todos();
