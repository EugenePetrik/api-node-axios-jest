import axios from 'axios';
import Base from './base.controller';

class Todos extends Base {
  getTodos() {
    return axios.get(`${this.url}/todos`, {
      headers: this.headers,
    });
  }
}

export default new Todos();
