const webdriver = require("selenium-webdriver");
const By = webdriver.By;
const moment = require("moment");
const automationConfig = require("../../config.json");
const smartUITests = require("./multiple-urls/urls.json");

// username: Username can be found at automation dashboard
const USERNAME = process.env.LT_USERNAME || "<Your_Username>";

// AccessKey:  AccessKey can be generated from automation dashboard or profile section
const KEY =
  process.env.LT_ACCESS_KEY ||
  "<Your_Access_Key>";

//connect to Lambdatest hub
const GRID_HOST = process.env.GRID_HOST || "@hub.lambdatest.com/wd/hub";

console.log(moment());

const gridUrl = "https://" + USERNAME + ":" + KEY + GRID_HOST;

// Selenium WebDriver Function

async function runSmartUIonLambdatest() {
  // Lambdatest Cloud Selenium Grid Connection

  // Printing the Lambdatest Cloud Information for the test

  console.log(
    "Please visit https://smartui.lambdatest.com to see your Selenium Tests"
  );

  try {
    automationConfig.forEach(async (...config) => {
      const driver = await new webdriver.Builder()
        .usingServer(gridUrl)
        .withCapabilities(...config)
        .build();
      try {
        smartUITests.forEach((smartUITest) => {
          let smartUI_ScreenshotName = smartUITest.screenshotName;
          let smartUI_url = smartUITest.url;
          console.log(smartUI_url, smartUI_ScreenshotName);
          smartUISeleniumTest(driver, smartUI_url, smartUI_ScreenshotName);
          console.log(smartUI_url, smartUI_ScreenshotName);
        });
      } catch (e) {
        console.log(e);
      }
      // Closing the Browser Session
      await driver.quit();
    });
  } catch (err) {
    console.log(JSON.stringify(err));
  }
}

async function smartUISeleniumTest(driver, url, screenshotName) {
  await driver
    .get(url)
    .then(() => {
      // For Smartui TakeScreenshot
      console.log(`Capturing the Screenshot ${screenshotName}`);
      driver
        .executeScript(`smartui.takeFullPageScreenshot=${screenshotName}`)
        .then((result) => {
          console.log("Result :", result);
        });
    })
    .catch((err) => {
      let error = JSON.stringify(err);
      console.log("Test failed with reason" + error);
      driver.executeScript("lambda-status=failed");
    });
}

// Executing the tests in parallel of multiple urls
runSmartUIonLambdatest();
