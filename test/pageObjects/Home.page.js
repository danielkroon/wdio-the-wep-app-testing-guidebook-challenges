const Generic = require("./Generic.page");
const Feed = require("./components/Feed.component");
const { getTrimmedText } = require("../../utils/functions");

class Home extends Generic {
  constructor(url = "./") {
    super(url);
  }

  load() {
    super.load();
    this.currentFeed.waitForLoad();
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

  get currentFeed() {
    return new Feed('[data-qa-type="article-list"]');
  }

  get $$popularTags() {
    return $$('//p[text()="Popular Tags"]/following-sibling::div/a');
  }
  get popularTags() {
    return this.$$popularTags.map(getTrimmedText);
  }

  clickTab(tabText) {
    const tabToClick = this.$$feedTabs.find(
      ($tab) => $tab.getText() === tabText
    );

    tabToClick.click();

    browser.waitUntil(
      () => {
        return this.activeFeedTabText[0] === tabText;
      },
      { timeoutMsg: "Active tab text never switched to desired text" }
    );
    this.currentFeed.waitForLoad();
  }
}

module.exports = Home;
