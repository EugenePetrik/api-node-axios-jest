import axios from 'axios';
import { CONFIG } from '../config/env';

class Photos {
  url = CONFIG.JSON_PLACEHOLDER_API;

  headers = {
    'Content-type': 'application/json; charset=UTF-8',
  };

  async getPhotos() {
    return await axios.get(`${this.url}/photos`, {
      headers: this.headers,
    });
  }
}

export default new Photos();
