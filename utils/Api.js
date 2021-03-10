const got = require("got");

class Api {
  constructor(prefixUrl) {
    this.client = got.extend({
      prefixUrl,
      responseType: "json",
    });
  }

  getAuthToken({ email, password }) {
    return this.client
      .post("users/login", {
        json: { user: { email, password } },
      })
      .then((response) => response.body.user.token);
  }

  async getTags() {
    try {
      const tagsResponse = await this.client.get(`tags`);
      // return just the array, not the full response
      return tagsResponse.body.tags;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Api;
