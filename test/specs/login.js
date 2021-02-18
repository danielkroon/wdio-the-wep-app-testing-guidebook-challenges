class Auth {
  get $email() {
    return $('input[type="email"]');
  }
  get $password() {
    return $('input[type="password"]');
  }
  get $signIn() {
    return $("button*=Sign in");
  }
  get $errorMessages() {
    return $(".error-messages li");
  }
  login(email, password) {
    this.$email.setValue(email);
    this.$password.setValue(password);
    this.$signIn.click();
    // wait until either the sign in button is gone or an error appears
    browser.waitUntil(
      () => {
        const signInExists = this.$signIn.isExisting();
        const errorExists = this.$errorMessages.isExisting();
        return !signInExists || errorExists;
      },
      {
        timoutMsg:
          'The "Sign in" button still exists and an error never appeared',
      }
    );
  }
}

const auth = new Auth();

describe("Login Page", function () {
  beforeEach(function () {
    browser.url("./login");
  });
  it("should let you log in", function () {
    auth.login("demo@learnwebdriverio.com", "wdiodemo");

    expect(auth.$errorMessages).not.toBeExisting();
  });
  it("should error with a missing username", function () {
    auth.login("", "wdiodemo");
    // assert that error message is showing
    expect(auth.$errorMessages).toHaveText(`email can't be blank`);
  });
  it("should error with a missing password", function () {
    auth.login("demo@learnwebdriverio.com", "");
    // assert that error message is showing
    expect(auth.$errorMessages).toHaveText(`password can't be blank`);
  });
});
