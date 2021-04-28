import axios from 'axios';
import Base from './base.controller';

class Albums extends Base {
  getAlbums() {
    return axios.get(`${this.url}/albums`, {
      headers: this.headers,
    });
  }

  getAlbumPhotos(albumId) {
    return axios.get(`${this.url}/albums/${albumId}/photos`, {
      headers: this.headers,
    });
  }
}

export default new Albums();
