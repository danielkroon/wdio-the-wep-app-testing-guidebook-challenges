const Generic = require("./Generic.page");
const { getTrimmedText } = require("../../utils/functions");

class Home extends Generic {
  constructor() {
    super("./");
  }

  get $feedsContainer() {
    return $('[data-qa-id="feed-tabs"]');
  }
  get $$feedTabs() {
    return this.$feedsContainer.$$('[data-qa-type="feed-tab"]');
  }
  get feedTabsText() {
    return this.$$feedTabs.map(getTrimmedText);
  }
  get activeFeedTabText() {
    return this.$feedsContainer
      .$$('[data-qa-type="feed-tab"] .active') // paste: [data-qa-type="feed-tab"] .active in Chrome Dev Tools to check.
      .map(getTrimmedText);
  }
}

module.exports = Home;
