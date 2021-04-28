import axios from 'axios';
import Base from './base.controller';

class Comments extends Base {
  getComments() {
    return axios.get(`${this.url}/comments`, {
      headers: this.headers,
    });
  }
}

export default new Comments();
