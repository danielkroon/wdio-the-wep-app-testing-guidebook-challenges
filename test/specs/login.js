describe("Login page:", () => {
  beforeEach(function () {
    // go to the login page
    browser.url("./login");
  });

  it("should let you log in (Chapter Challenge 2.3)", () => {
    // enter a valid username in the "email" input
    $('input[type="email"]').setValue("demo@learnwebdriverio.com");

    // enter a vlaid password in the "password" input
    $('input[type="password"]').setValue("wdiodemo");

    const $signIn = $("button*=Sign in");

    // click the 'Sign in' button
    $signIn.click();

    // wait for the sign in button to be removed from the DOM
    $signIn.waitForExist({ reverse: true });

    $("=Settings").waitForExist();

    // this is not necassary, but for Chapter Challenge 2.3
    $("=Your Feed").waitForDisplayed();

    expect($(".error-messages li")).not.toBeExisting();

    // get the URL of the page, which should nog longer include 'login'
    expect(browser.getUrl()).not.toContain("/login");
  });

  it("should error with a missing username", function () {
    $('input[type="password"]').setValue("wdiodemo");

    $("button*=Sign in").click();

    // assert that error message is showing
    expect($(".error-messages li")).toHaveText(`email can't be blank`); // note the use of backticks due to the apostrophe in "can't"
  });
  it("should error with a missing password", function () {
    $('input[type="email"]').setValue("demo@learnwebdriverio.com");

    $("button*=Sign in").click();

    // assert that error message is showing
    expect($(".error-messages li")).toHaveText(`password can't be blank`);
  });
});
