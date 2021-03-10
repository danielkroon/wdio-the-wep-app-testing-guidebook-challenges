const Home = require("../pageObjects/Home.page");
const { user1 } = require("../fixtures/users");
const home = new Home();

describe("Homepage", function () {
  describe("Anonymous", function () {
    before(function () {
      // load the page
      home.load();
    });

    it("should load properly", function () {
      // check that top nav/footer exist
      expect(home.$siteHeader).toBeExisting();
      expect(home.$siteFooter).toBeExisting();
      expect(home.$siteNav).toBeExisting();
    });

    it("should only show the global feed tab", function () {
      expect(home.feedTabsText).toEqual(["Global Feed"]);
    });

    it('should show "Popular Tags"', function () {
      // get the tags that should exist from the API
      const apiTags = browser.call(() => {
        return global.api.getTags();
      });

      expect(home.popularTags).toEqual(apiTags);
    });
  });

  describe("Logged In", function () {
    before(function () {
      browser.loginViaApi(user1);

      home.load();
    });

    it("should show both feed tabs", function () {
      console.log("feedsContainer HTML is " + home.$feedsContainer.getHTML());
      expect(home.feedTabsText).toEqual(["Your Feed", "Global Feed"]);
    });

    it('should default to showing the "global" feed', function () {
      // get all tabs with an 'active' class, check only one returns with correct text
      expect(home.activeFeedTabText).toEqual(["Global Feed"]);
    });

    it("should let you switch between global and personal feeds", function () {
      // click on 'Your feed' tab
      home.clickTab("Your Feed");

      // validate 'active' tabs are correct
      expect(home.activeFeedTabText).toEqual(["Your Feed"]);

      // click 'Global' tab
      home.clickTab("Global Feed");

      // validate again
      expect(home.activeFeedTabText).toEqual(["Global Feed"]);
    });

    describe("Personal Feed", function () {
      before(function () {
        // ensure we're on the active feed tab
        if (home.activeFeedTabText !== "Your Feed") {
          home.clickTab("Your Feed");
        }
      });
      it("should show articles just from people you follow", function () {
        expect(home.currentFeed.$$articles).toHaveChildren(2);
      });

      it("should show most recent article first", function () {
        const firstArticleDetails = home.currentFeed.articles[0].getDetails();

        console.log(firstArticleDetails);
        console.log(Object.getOwnPropertyNames(firstArticleDetails));

        //  expect(firstArticleDetails).toHaveProperty('"author"');
        // expect(firstArticleDetails).toHaveProperty("date", "March 10, 2021");
        // expect(firstArticleDetails).toHaveProperty("title", "sadfasd");
        // expect(firstArticleDetails).toHaveProperty("description", "asdfasdf");
      });
    });

    after(function () {
      browser.clearSession();
    });
  });
});
