import axios from 'axios';
import Base from './base.controller';

class Photos extends Base {
  getPhotos() {
    return axios.get(`${this.url}/photos`, {
      headers: this.headers,
    });
  }
}

export default new Photos();
