const { URL } = require("url");

class Generic {
  // Constructors are methods that will run when your class is instantiated.
  constructor(path) {
    this.path = path;

    // store the url by combining specific page path with WDIO base url // using the NodeJS URL utility
    this.url = new URL(path, browser.config.baseUrl);
  }

  load() {
    browser.url(this.path);
  }

  /* 
  By including these references in the Generic page object, anything that extends off of it will have those references (hence home.$siteHeader in the test file). This is useful for sharing common page template details across all your files.
  */
  get $siteHeader() {
    return $('[data-qa-id="site-header"]');
  }
  get $siteNav() {
    return $('[data-qa-id="site-nav"]');
  }
  get $siteFooter() {
    return $('[data-qa-id="site-footer"]');
  }
}

module.exports = Generic;
