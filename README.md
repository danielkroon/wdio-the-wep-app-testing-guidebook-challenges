# WDIO the wep app testing book challenges, best practices & naming conventions

## Run

Navigate into the wdio-realworld folder and run one of the commands below.

Run all spec files at once:

```bash
npx wdio --logLevel=silent    
```

Run the login spec file and silence the extensive log with the flag --logLevel=silent:


```bash
npx wdio --spec=login --logLevel=silent
```

Run the login spec file with a specific SEED:

```bash
SEED=0.00726358915055525 npx wdio --spec=login
```

---

## Best practices

- Use same folder structure as this project
- If a test needs a logged in state: always log out without the UI. Use a custom clearSession command for this. Can be found in the wdio.conf.js file.
- If a test needs a logged in state: always log in without the UI. Use a custom loginViaApi command for this. Can be found in the wdio.conf.js file.
- Always use the Page Object Pattern
- Don't use browser.pause. Always use browser.waitUntil
- Use data-\* attributes to provide context to your selectors and isolate them from CSS or JS changes.
- Tests should always be able to be run independently from one another and still pass. Dont couple test together.
- Don't do this: browser.url('https://webdriver.io'); Always store the url by combining specific page path with WDIO base url. For example: _wdio-realworld/test/specs/register.js_ and _/wdio-realworld/test/pageObjects/Editor.page.js_
- Don't add logic to spec files. Only when there is no other way to store the logic.
- Use the Utility library Chance to generate anything random. For example: _test/specs/editor.js_
- Don't do URL assertions.
- Use the native WebdriverIO Expect assertions library or the ExpectJS accesertions library. Not the NodeJS Assert API or a simple if statement.
- Add users to test/fixtures/users.js. TODO we should create a .env file.
- If you use certain UI components in multiple pages. Please create a component for it. For example: https://www.youtube.com/watch?v=rIsMhWfu2L8
- If you created data for a test. For example in a before hook. Also delete this data in a after hook. Don't do this via the UI but via an API request.

## Naming Conventions

- pageObject file names start with a capital letter and end with .page.js.
- Spec files start with a small letter.
- Every class extends the Generic class. Even when you don't use anything yet from the Generic class.

For selectors use:

```
+----------+----------------------------+--------+-----------------+
| Category |      UI/Control type       | Prefix |     Example     |
+----------+----------------------------+--------+-----------------+
| Basic    | Button                     | btn    | btnExit         |
| Basic    | Check box                  | chk    | chkReadOnly     |
| Basic    | Combo box                  | cbo    | cboEnglish      |
| Basic    | Common dialog              | dlg    | dlgFileOpen     |
| Basic    | Date picker                | dtp    | dtpPublished    |
| Basic    | Dropdown List / Select tag | ddl    | ddlCountry      |
| Basic    | Form                       | frm    | frmEntry        |
| Basic    | Frame                      | fra    | fraLanguage     |
| Basic    | Image                      | img    | imgIcon         |
| Basic    | Label                      | lbl    | lblHelpMessage  |
| Basic    | Links/Anchor Tags          | lnk    | lnkForgotPwd    |
| Basic    | List box                   | lst    | lstPolicyCodes  |
| Basic    | Menu                       | mnu    | mnuFileOpen     |
| Basic    | Radio button / group       | rdo    | rdoGender       |
| Basic    | RichTextBox                | rtf    | rtfReport       |
| Basic    | Table                      | tbl    | tblCustomer     |
| Basic    | TabStrip                   | tab    | tabOptions      |
| Basic    | Text Area                  | txa    | txaDescription  |
| Basic    | Text box                   | txt    | txtLastName     |
| Complex  | Chevron                    | chv    | chvProtocol     |
| Complex  | Data grid                  | dgd    | dgdTitles       |
| Complex  | Data list                  | dbl    | dblPublisher    |
| Complex  | Directory list box         | dir    | dirSource       |
| Complex  | Drive list box             | drv    | drvTarget       |
| Complex  | File list box              | fil    | filSource       |
| Complex  | Panel/Fieldset             | pnl    | pnlGroup        |
| Complex  | ProgressBar                | prg    | prgLoadFile     |
| Complex  | Slider                     | sld    | sldScale        |
| Complex  | Spinner                    | spn    | spnPages        |
| Complex  | StatusBar                  | sta    | staDateTime     |
| Complex  | Timer                      | tmr    | tmrAlarm        |
| Complex  | Toolbar                    | tlb    | tlbActions      |
| Complex  | TreeView                   | tre    | treOrganization |
+----------+----------------------------+--------+-----------------+
```

For actions use:

```
+--------------------------------+--------+---------------------------+
| Action                         | Prefix | Example                   |
+--------------------------------+--------+---------------------------+
| Click                          | clk    | clkSigin, clkRegister     |
| Type                           | set    | setEmail, setPassword     |
| Check a check box              | chk    | chkGender                 |
| Select value from drop down    | select | selectYear, selectMonth   |
+--------------------------------+--------+---------------------------+
```
