const { user1 } = require("../fixtures/users");
const TagPage = require("../pageObjects/Tag.page");

describe("Tags Feed", function () {
  let articleDetails, tagName, tagPage;
  let articleResponse;

  before(function () {
    articleDetails = {
      title: chance.sentence({ words: 3 }),
      description: chance.sentence({ words: 7 }),
      body: chance.paragraph({ sentences: 2 }),
      tagList: [chance.word({ length: 30 })],
    };

    tagName = articleDetails.tagList[0];

    // create the article we need to get the specific tag
    articleResponse = browser.call(() => {
      return global.api.createArticle(user1, articleDetails);
    });

    tagPage = new TagPage(tagName);

    // load the page
    tagPage.load();
  });

  it("should have tag tab", function () {
    // check that we're on the tag tab
    expect(tagPage.activeFeedTabText).toEqual([tagName]);
  });

  it("should load only articles for that tag", function () {
    expect(tagPage.currentFeed.$$articles).toHaveChildren(2);
  });

  it("should show most recent article for tag first", function () {
    const firstArticleDetails = tagPage.currentFeed.articles[0].getDetails();

    expect(firstArticleDetails).toMatchObject({
      title: articleDetails.title,
      description: articleDetails.description,
    });
  });

  after(function () {
    browser.call(() => {
      return global.api.deleteArticle(user1, articleResponse.slug);
    });
  });
});
