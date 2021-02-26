const assert = require("assert");

describe("Main Navigation:", () => {
  it("should load properly", () => {
    // load the default page
    browser.url("./");

    /*
    Get the title of the homepage, should be 'Conduit'. Checking titles (text) is NOT a best practice. This is just an example. Check text and links isn't worth writing a test for.
    */

    // Using a console log to manually assert the value.
    console.log(browser.getTitle());

    // Using a simple JS if statement to make a automatic assertion.
    if (browser.getTitle() !== "Conduit") {
      // Throw an error explaning what went wrong
      throw new Error('Title of the homepage should be "Conduit');
    }

    // Using the standard NodeJS Assert API to make a automatic assertion. We do need to import the asser library on the top of the page.
    assert.strictEqual(browser.getTitle(), "Conduit");

    // Using the native WebdriverIO Expect assertions library. Because it's easier to write, better error messages and it automatically retries failed assertions.
    expect(browser).toHaveTitle("Conduit");

    // Click the 'Sign in' navigation link
    $("=Sign in").click();

    /*
    Get the URL of the sign in page. It should include 'login'.
    */

    // Using a console log to manually assert the value.
    console.log(browser.getUrl());

    // Using a simple JS if statement to make a automatic assertion.
    if (browser.getUrl() !== "http://localhost:8080/login") {
      // Throw an error explaning what went wrong
      throw new Error('URL of "login" page should be correct');
    }

    // Using the standard NodeJS Assert API to make a automatic assertion. We do need to import the asser library on the top of the page.
    assert.strictEqual(browser.getUrl(), "http://localhost:8080/login");

    // Using the native WebdriverIO Expect assertions library. Because it's easier to write, better error messages and it automatically retries failed assertions.
    expect(browser).toHaveUrl("http://localhost:8080/login");

    // Adding a extra addition to our expect makes sure this assertion also works on a differnt site than the default url.
    expect(browser).toHaveUrl("/login", {
      containing: true,
    });

    // We also get access to the ExpectJS accesertions library
    expect(browser.getUrl()).toEqual("http://localhost:8080/login");

    const links = $$("a");
    expect(links).toHaveLength(7);
  });

  it("should bring me back to the homepage when I click on the Conduit logo (Chapter Challenge 2.1)", () => {
    // By adding the asterisk WDIO will look for a partrial text match, not the full one.
    $("a*=onduit").click();

    expect(browser).toHaveUrl("http://localhost:8080/");
  });

  it("should select elements in the footer and sidebar (Chapter Challenge 2.2)", () => {
    // Select text in the footer
    $(".attribution");

    // Select all tags in the popular tags sidebar
    $(".sidebar .tag-list a");

    // // Select all tags in the popular tags sidebar using the Populair Tags header text
    $('//p[text()="Popular Tags"]/following-sibling::div//a');
  });
});
