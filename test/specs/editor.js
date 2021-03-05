const Auth = require("../pageObjects/Auth.page");
const Editor = require("../pageObjects/Editor.page");
const Article = require("../pageObjects/Article.page");
const { user1 } = require("../fixtures/users");

const auth = new Auth();
const editor = new Editor();
const article = new Article();

describe("Post Editor", function () {
  before(function () {
    browser.loginViaApi(user1);
  });

  beforeEach(function () {
    editor.load();
  });

  it("should load page properly", function () {
    expect(browser).toHaveUrl(editor.url.href);
    expect(editor.$title).toBeExisting();
    expect(editor.$description).toBeExisting();
    expect(editor.$body).toBeExisting();
    expect(editor.$tags).toBeExisting();
    expect(editor.$publish).toBeExisting();
  });

  it("should let you publish a new post", function () {
    // store the article information as a separate object and send it into submitArticle. So we assert the article information.
    const articleDetails = {
      title: global.chance.sentence({ words: 3 }),
      description: global.chance.sentence({ words: 7 }),
      body: global.chance.paragraph({ sentences: 4 }),
      tags: [global.chance.word(), chance.word()],
    };

    editor.submitArticle(articleDetails);

    /*
    The URL assertion is below is not best practice since we introduce a lot of logic in our tests. But it's a good example of how we can test a random generated URL.
    */

    // convert the title to the URL version so we can assert it
    const slug = articleDetails.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    // expect to be on new article page
    expect(browser).toHaveUrl(`articles/${slug}`, { containing: true });

    /*
    The assertions below are best practice. Since we don't need logic in our test. Plus, it’s more important for the information on the page to be correct than the URL be in some specific format. I’d much rather know that our title isn’t saving correctly than if our URL isn’t right.
    */

    expect(article.$title).toHaveText(articleDetails.title);
    expect(article.$body).toHaveText(articleDetails.body);

    /*
     Test multiple tags in the tags array with join. Because if we have multiple tags and we run getText on the tags element, we’d get all the tags in a single string (e.g., ‘tag1 tag2’). Join is used to separate one element of an array from the next in the resulting String.
    */
    expect(article.$tags).toHaveText(articleDetails.tags.join(" "));

    /*
    tagsText will be an array of whatever text is there (e.g., [‘tag1’, ‘tag2’]), which is going to match what we have defined in articleDetails.tags and create a handy assertion:
    */
    expect(article.tagsText).toEqual(articleDetails.tags);

    // to avoid making a lot of articles, let's just click the delete button to // clean it up. We'll talk about a better way to clean it later on.
    article.$delete.click();
  });
});

describe('"Unsaved Changes" alerts', function () {
  beforeEach(function () {
    editor.load();
    editor.$title.setValue("Unsaved Change");
  });

  it("should alert you when using browser navigation", function () {
    // try refreshing the page
    browser.refresh();

    // validate alert is showing
    expect(() => browser.acceptAlert()).not.toThrow();
  });

  it("should warn you when trying to change URL", function () {
    // try going to the homepage
    $("=Home").click();
    const alertText = browser.getAlertText();
    expect(alertText).toEqual(
      "Do you really want to leave? You have unsaved changes!"
    );
    // accept the alert to avoid it from preventing further tests from executing
    browser.acceptAlert();
  });
});
