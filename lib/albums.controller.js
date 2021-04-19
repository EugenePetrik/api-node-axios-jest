import axios from 'axios';

class Albums {
  url = process.env.JSON_PLACEHOLDER_API;

  headers = {
    'Content-type': 'application/json; charset=UTF-8'
  };

  async getAlbums() {
    return await axios.get(`${this.url}/albums`, {
      headers: this.headers,
    });
  }
}

export default new Albums();
