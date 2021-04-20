import axios from 'axios';

class Posts {
  url = process.env.JSON_PLACEHOLDER_API;

  headers = {
    'Content-type': 'application/json; charset=UTF-8'
  };

  async getPosts() {
    return await axios.get(`${this.url}/posts`, {
      headers: this.headers,
    });
  }

  async getPostComments(postId) {
    return await axios.get(`${this.url}/posts/${postId}/comments`, {
      headers: this.headers,
    });
  }
}

export default new Posts();
