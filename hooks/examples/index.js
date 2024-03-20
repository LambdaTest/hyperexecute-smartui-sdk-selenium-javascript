let boundingBoxesTest = require("./boundingBoxes");
let errorTest = require("./errorSetting");
let ignoredBoxesTest = require("./ignoredBoxes");
let transparencyTest = require("./transparency");
let generalTest = require("./general");
let ignoreAreasColoredWith = require("./ignoreAreasColoredWith");
let helpLogger = require("../../util/helpLogger");
let validCommands = require("../../util/validCommands");
let capabilities = require("../../config.json");

async function test() {

  const driver = await new webdriver.Builder()
  .usingServer(gridUrl)
  .withCapabilities(caps)
  .build();

  // the command line argument passed while executing
  let arg = process.argv.slice(2)[0];

  if (!arg) {
    arg = "all";
  }

  // check if the argument is a valid command or not
  if (!Object.values(validCommands).includes(arg)) {
    helpLogger();
  }

  // username: Username can be found at automation dashboard
  const USERNAME = process.env.LT_USERNAME || "username";

  // AccessKey:  AccessKey can be generated from automation dashboard or profile section
  const KEY = process.env.LT_ACCESS_KEY || "accessKey";

  // gridUrl: gridUrl can be found at automation dashboard
  const GRID_HOST = process.env.GRID_HOST || "@hub.lambdatest.com/wd/hub"; //connect to lambdatest hub

  // Credentials Object
  let credentials = {
    username: USERNAME,
    key: KEY,
    gridHost: GRID_HOST,
  };

  // Setup Input capabilities
  capabilities["user"] = USERNAME;
  capabilities["accessKey"] = KEY;

  // Running General test.
  if (arg === validCommands.all || arg === validCommands.general) {
    generalTest(capabilities, credentials)
      .then(function (status) {
        console.log("Successfully Executed General Test.");
        driver.executeScript("lambda-status=passed");
        driver.quit();
      }, 15000)
      .catch(function (err) {
        console.log("Test Failed " + err);
        driver.executeScript("lambda-status=failed");
        driver.quit();
      });
  }

  // Running Error Setting Test.
  if (arg === validCommands.all || arg == validCommands.error) {
    errorTest(capabilities, credentials)
      .then(function (status) {
        console.log("Successfully Executed Error Settings Test.");
        driver.executeScript("lambda-status=passed");
        driver.quit();
      }, 15000)
      .catch(function (err) {
        console.log("Error Seting Test Failed " + err);
        driver.executeScript("lambda-status=failed");
        driver.quit();
      });
  }

  //Running Transparency Test.
  if (arg === validCommands.all || arg == validCommands.transparency) {
    transparencyTest(capabilities, credentials)
      .then(function (status) {
        console.log("Successfully Executed Transparency Test.");
        driver.executeScript("lambda-status=passed");
        driver.quit();
      }, 15000)
      .catch(function (err) {
        console.log("Transparency test Failed " + err);
        driver.executeScript("lambda-status=failed");
        driver.quit();
      });
  }

  // Running Bounding Box test.
  if (arg === validCommands.all || arg == validCommands.boundingBoxes) {
    boundingBoxesTest(capabilities, credentials)
      .then(function (status) {
        console.log("Successfully Executed Bounding Boxes Test.");
        driver.executeScript("lambda-status=passed");
        driver.quit();
      }, 15000)
      .catch(function (err) {
        console.log("Bounding Boxes test Failed " + err);
        driver.executeScript("lambda-status=failed");
        driver.quit();
      });
  }

  // Running Ignored Box Test.
  if (arg === validCommands.all || arg == validCommands.ignoredBoxes) {
    ignoredBoxesTest(capabilities, credentials)
      .then(function (status) {
        console.log("Successfully Executed Ignored Boxes Test.");
        driver.executeScript("lambda-status=passed");
        driver.quit();        
      }, 15000)
      .catch(function (err) {
        console.log("Ignored Boxes test Failed " + err);
        driver.executeScript("lambda-status=failed");
        driver.quit();
      });
  }

  // Running Ignore Areas Colored Test.
  if (
    arg === validCommands.all ||
    arg == validCommands.ignoreAreasColoredWith
  ) {
    ignoreAreasColoredWith(capabilities, credentials)
      .then(function (status) {
        console.log("Successfully Executed Ignore Areas Colored Test.");
        driver.executeScript("lambda-status=passed");
        driver.quit();
      }, 15000)
      .catch(function (err) {
        console.log("Ignore Areas Colored test Failed " + err);
        driver.executeScript("lambda-status=failed");
        driver.quit();
      });
  }
}

test();
