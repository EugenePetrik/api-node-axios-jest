import axios from 'axios';

class Posts {
  url = process.env.JSON_PLACEHOLDER_API;

  headers = {
    'Content-type': 'application/json; charset=UTF-8',
  };

  async getPosts() {
    return await axios.get(`${this.url}/posts`, {
      headers: this.headers,
    });
  }

  async getPost(postId) {
    return await axios.get(`${this.url}/posts/${postId}`, {
      headers: this.headers,
    });
  }

  async createPosts(body) {
    return await axios.post(`${this.url}/posts`, JSON.stringify(body), {
      headers: this.headers,
    });
  }

  async updatePost(postId, body) {
    return await axios.put(`${this.url}/posts/${postId}`, JSON.stringify(body), {
      headers: this.headers,
    });
  }

  async patchPost(postId, body) {
    return await axios.patch(`${this.url}/posts/${postId}`, JSON.stringify(body), {
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
