const Home = require("./Home.page");

// Since this page is almost exactly the same as the homepage, just with an extra tab for the specific tag. What we can do is, instead of duplicating the Home page object, just extend off of it.
class Tag extends Home {
  constructor(tagName) {
    super("./tag/" + tagName);
  }
}
module.exports = Tag;
