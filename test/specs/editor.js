const Auth = require("../pageObjects/Auth.page");
const Editor = require("../pageObjects/Editor.page");
const { user1 } = require("../fixtures/users");

const auth = new Auth();
const editor = new Editor();

describe("Post Editor", function () {
  before(function () {
    auth.load();
    auth.login(user1);
  });
  beforeEach(function () {
    editor.load();
  });
  it("should load page properly", function () {
    expect(browser).toHaveUrl("editor", { containing: true });
    expect(editor.$title).toBeExisting();
    expect(editor.$description).toBeExisting();
    expect(editor.$body).toBeExisting();
    expect(editor.$tags).toBeExisting();
    expect(editor.$publish).toBeExisting();
  });
});
