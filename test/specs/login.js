describe("Login page:", () => {
  it("should let you log in (Chapter Challenge 2.3)", () => {
    // go to the login page
    browser.url("./login");

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

  it("should error with a missing username", () => {});

  it("should error with a missing password", () => {});
});
