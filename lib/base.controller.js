import { CONFIG } from '../config/env';

class Base {
  constructor() {
    this.url = CONFIG.JSON_PLACEHOLDER_API;
    this.headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };
  }
}

module.exports = Base;
