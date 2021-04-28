import axios from 'axios';
import Base from './base.controller';

class Posts extends Base {
  getPosts() {
    return axios.get(`${this.url}/posts`, {
      headers: this.headers,
    });
  }

  getPost(postId) {
    return axios.get(`${this.url}/posts/${postId}`, {
      headers: this.headers,
    });
  }

  createPosts(body) {
    return axios.post(`${this.url}/posts`, JSON.stringify(body), {
      headers: this.headers,
    });
  }

  updatePost(postId, body) {
    return axios.put(`${this.url}/posts/${postId}`, JSON.stringify(body), {
      headers: this.headers,
    });
  }

  patchPost(postId, body) {
    return axios.patch(`${this.url}/posts/${postId}`, JSON.stringify(body), {
      headers: this.headers,
    });
  }

  deletePost(postId) {
    return axios.delete(`${this.url}/posts/${postId}`, {
      headers: this.headers,
    });
  }

  getPostComments(postId) {
    return axios.get(`${this.url}/posts/${postId}/comments`, {
      headers: this.headers,
    });
  }
}

export default new Posts();
