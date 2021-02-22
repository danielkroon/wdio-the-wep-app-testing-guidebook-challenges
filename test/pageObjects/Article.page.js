const Generic = require("./Generic.page");

class Article extends Generic {
  get $container() {
    return $('[data-qa-id="article-page"]');
  }
  get $title() {
    return $('[data-qa-id="article-title"]');
  }
  get $body() {
    return $('[data-qa-id="article-body"]');
  }
  get $tags() {
    return $('[data-qa-id="article-tags"]');
  }

  // We use $$ to target all elements that match (not just the first), and we add a second bit of information to our selector to match the specific tag (not just the container of the tags).
  get $$tags() {
    return $$('[data-qa-id="article-tags"] [data-qa-type="article-tag"]');
  }
  get $edit() {
    return $('[data-qa-id="article-edit"]');
  }
  get $delete() {
    return $('[data-qa-id="article-delete"]');
  }

  /*
    We need to extract the text out of the returned elements. We can’t run article.$$tags.getText(), because that function only works on a single element reference. article.$$tags[0].getText() would work, since it’s a single element, but then we’d only be getting that single bit of information when we really want all of it. We can use the built-in map function here. map is very similar to forEach. The main difference is that map allows you to take the data in the array and return something else from it.
    */
  get tagsText() {
    return this.$$tags.map(($tag) => $tag.getText());
  }
}
module.exports = Article;
