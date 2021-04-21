import axios from 'axios';
import { CONFIG } from '../config/env';

class Albums {
  url = CONFIG.JSON_PLACEHOLDER_API;

  headers = {
    'Content-type': 'application/json; charset=UTF-8',
  };

  async getAlbums() {
    return await axios.get(`${this.url}/albums`, {
      headers: this.headers,
    });
  }

  async getAlbumPhotos(albumId) {
    return await axios.get(`${this.url}/albums/${albumId}/photos`, {
      headers: this.headers,
    });
  }
}

export default new Albums();
