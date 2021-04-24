import axios from 'axios';
import { CONFIG } from '../config/env';

class Comments {
  url = CONFIG.JSON_PLACEHOLDER_API;

  headers = {
    'Content-type': 'application/json; charset=UTF-8',
  };

  async getComments() {
    return await axios.get(`${this.url}/comments`, {
      headers: this.headers,
    });
  }
}

export default new Comments();
