<img height="100" alt="hyperexecute_logo" src="https://user-images.githubusercontent.com/1688653/159473714-384e60ba-d830-435e-a33f-730df3c3ebc6.png">

HyperExecute is a smart test orchestration platform to run end-to-end Selenium tests at the fastest speed possible. HyperExecute lets you achieve an accelerated time to market by providing a test infrastructure that offers optimal speed, test orchestration, and detailed execution logs.

Integrating seamlessly into your existing Selenium Javascript testing suite, SmartUI SDK revolutionizes the way you approach visual regression testing. Our robust solution empowers you to effortlessly capture, compare, and analyze screenshots across a multitude of browsers and resolutions, ensuring comprehensive coverage and accuracy in your visual testing endeavors.

The overall experience helps teams test code and fix issues at a much faster pace. HyperExecute is configured using a YAML file. Instead of moving the Hub close to you, HyperExecute brings the test scripts close to the Hub!

* <b>HyperExecute HomePage</b>: https://www.testmuai.com/hyperexecute
* <b>TestMu AI HomePage</b>: https://www.testmuai.com
* <b>TestMu AI Support</b>: [support@testmuai.com](mailto:support@testmuai.com)

To know more about how HyperExecute does intelligent Test Orchestration, do check out [HyperExecute Getting Started Guide](https://www.testmuai.com/support/docs/getting-started-with-hyperexecute/)

# How to run Selenium Javascript tests through SmartUI SDK on HyperExecute — TestMu AI (Formerly LambdaTest)

* [Prerequisites](#prerequisites)
   - [Clone the Sample Repository](#clone-the-sample-repository)
   - [Download HyperExecute CLI](#download-hyperexecute-cli)
   - [Configure Environment Variables](#configure-environment-variables)
* [Create a SmartUI Project](#create-a-smartui-project)
* [Update your Project Configurations](#update-your-project-configurations)
* [Configure YAML File](#configure-yaml-in-your-test-suite)
* [Execute your Test Suite](#execute-your-test-suite)
* [Navigation in Automation Dashboard](#navigation-in-automation-dashboard)

## Prerequisites

- Login to [HyperExecute](https://hyperexecute.lambdatest.com/) with your credentials.
- Basic understanding of Command Line Interface and Selenium Javascript is required.
- Before using HyperExecute, you have to download HyperExecute CLI corresponding to the host OS. Along with it, you also need to export the environment variables *LT_USERNAME* and *LT_ACCESS_KEY* that are available in the [TestMu AI Profile](https://accounts.lambdatest.com/detail/profile) page.

### Clone the Sample Repository

Download or Clone the code sample for the Selenium Javascript from the TestMu AI GitHub repository to run the tests on the HyperExecute.

```bash
git clone https://github.com/LambdaTest/hyperexecute-smartui-sdk-selenium-javascript
cd hyperexecute-smartui-sdk-selenium-javascript
```

### Download HyperExecute CLI

HyperExecute CLI is the CLI for interacting and running the tests on the HyperExecute Grid. The CLI provides a host of other useful features that accelerate test execution. In order to trigger tests using the CLI, you need to download the HyperExecute CLI binary corresponding to the platform (or OS) from where the tests are triggered:

Also, it is recommended to download the binary in the project's parent directory. Shown below is the location from where you can download the HyperExecute CLI binary:

* Mac: https://downloads.lambdatest.com/hyperexecute/darwin/hyperexecute
* Linux: https://downloads.lambdatest.com/hyperexecute/linux/hyperexecute
* Windows: https://downloads.lambdatest.com/hyperexecute/windows/hyperexecute.exe

### Configure Environment Variables

Before the tests are run, please set the environment variables LT_USERNAME & LT_ACCESS_KEY from the terminal. The account details are available on your [TestMu AI Profile](https://accounts.lambdatest.com/detail/profile) page.

For macOS:

```bash
export LT_USERNAME=LT_USERNAME
export LT_ACCESS_KEY=LT_ACCESS_KEY
```

For Linux:

```bash
export LT_USERNAME=LT_USERNAME
export LT_ACCESS_KEY=LT_ACCESS_KEY
```

For Windows:

```bash
set LT_USERNAME=LT_USERNAME
set LT_ACCESS_KEY=LT_ACCESS_KEY
```

## Create a SmartUI Project

The first step is to create a project with the application in which we will combine all your builds run on the project. To create a SmartUI Project, follow these steps:

1. Go to [SmartUI Projects page](https://smartui.lambdatest.com/)
2. Click on the `New Project` button
3. Select the platform as **CLI** for executing your `SDK` tests.
4. Add name of the project, approvers for the changes found, tags for any filter or easy navigation.
5. Click on the **Submit**.

## Update Your Project Configurations

In the `sdkCloud.js` file, update the following capabilities

- `project`: Enter your Project Name
- `name`: You need to provide the name of your test
- `build`: Mention your desired build name

```bash
  project: "PROJECT_NAME", //name of the project
  name: "TEST_NAME", // name of the test
  build: "BUILD_NAME", // name of the build
```

## Configure YAML in your Test Suite

Here is the sample YAML file for your reference that is being used in this repository.

You need to edit the `PROJECT_TOKEN: "YOUR_PROJECT_TOKEN"` flag and enter your project token that show in the SmartUI app after, creating your project.

```bash
---
version: 0.1
globalTimeout: 90
testSuiteTimeout: 90
testSuiteStep: 90

runson: win

autosplit: true

retryOnFailure: true
maxRetries: 1

concurrency: 1

env:
  CACHE_DIR: m2_cache_dir
  PROJECT_TOKEN: "YOUR_PROJECT_TOKEN" #Enter your project token here

cacheKey: '{{ checksum "package.json" }}'
cacheDirectories:
  - node_modules

pre:
  - npm i @lambdatest/smartui-cli @lambdatest/selenium-driver selenium-webdriver
  - npx smartui config:create smartui-web.json

post:
  - cat hyp-smartui-sdk-selenium-javascript.yaml

testDiscovery:
  type: raw
  mode: static
  command: ls hooks/examples/*.js

testRunnerCommand: npx smartui exec node sdkCloud.js --config smartui-web.json

jobLabel: ["smart-ui-sdk", "hyperexecute", "selenium", "javascript"]
```

## Execute your Test Suite

NOTE: In case of macOS, if you get a permission denied warning while executing CLI, simply run **`chmod u+x ./hyperexecute`** to allow permission. In case you get a security popup, allow it from your **System Preferences** → **Security & Privacy** → **General tab**.

Run the below command in your terminal at the root folder of the project:

```bash
./hyperexecute --config <path_of_yaml_file>
```

OR use this command if you have not exported your username and access key in the step 2.

```bash
./hyperexecute --user <your_username> --key <your_access_key> --config <path_of_yaml_file>
```

e.g.

```bash
./hyperexecute --user user1 --key 12345 --config hyp-smartui-sdk-selenium-javascript.yaml
```

## Navigation in Automation Dashboard

HyperExecute lets you navigate from/to *Test Logs* in Automation Dashboard from/to *HyperExecute Logs*. You also get relevant get relevant XCUI test details like video, network log, commands, Exceptions & more in the Dashboard. Effortlessly navigate from the automation dashboard to HyperExecute logs (and vice-versa) to get more details of the test execution.

Visit the [HyperExecute Dashboard](https://hyperexecute.lambdatest.com/hyperexecute) and check your Job status. 

Visit your SmartUI project to view builds and compare snapshots between different test runs. You can see the Smart UI dashboard to view the results. This will help you identify the Mismatches from the existing `Baseline` build and do the required visual testing.

## TestMu AI Community :busts_in_silhouette:

The [TestMu AI Community](https://community.testmuai.com/) allows people to interact with tech enthusiasts. Connect, ask questions, and learn from tech-savvy people. Discuss best practises in web development, testing, and DevOps with professionals from across the globe.

## Documentation & Resources :books:
      
If you want to learn more about the TestMu AI's features, setup, and usage, visit the [TestMu AI documentation](https://www.testmuai.com/support/docs/). You can also find in-depth tutorials around test automation, mobile app testing, responsive testing, manual testing on [TestMu AI Blog](https://www.testmuai.com/blog/) and [TestMu AI Learning Hub](https://www.testmuai.com/learning-hub/).     
      
 ## About TestMu AI

[TestMu AI](https://www.testmuai.com) is a leading test execution and orchestration platform that is fast, reliable, scalable, and secure. It allows users to run both manual and automated testing of web and mobile apps across 3000+ different browsers, operating systems, and real device combinations. Using TestMu AI, businesses can ensure quicker developer feedback and hence achieve faster go to market. Over 500 enterprises and 1 Million + users across 130+ countries rely on TestMu AI for their testing needs.

[<img height="70" src="https://user-images.githubusercontent.com/70570645/169649126-ed61f6de-49b5-4593-80cf-3391ca40d665.PNG">](https://accounts.lambdatest.com/register)
      
## We are here to help you :headphones:

* Got a query? we are available 24x7 to help. [Contact Us](mailto:support@testmuai.com)
* For more info, visit - https://www.testmuai.com

## 🚀 LambdaTest is Now TestMu AI

👋 Welcome to TestMu AI, the next evolution of LambdaTest. As of January 2026, [LambdaTest is Now TestMu AI](https://www.testmuai.com/lambdatest-is-now-testmuai/) - we have evolved from a cross-browser testing cloud into a unified, AI-native quality engineering platform designed for the modern DevOps era.

Whether you have been part of the LambdaTest community for years or are just discovering TestMu AI, our mission remains the same: to help you ship faster with high-scale test execution, autonomous testing, and deep quality analytics.

### 🔄 Our Rebrand Journey

In 2017, we introduced LambdaTest with a clear mission: to become the world's most trusted cloud testing platform. We built a scalable, high-performance test cloud that eliminated flakiness, improved developer feedback cycles, and accelerated release velocity for teams worldwide.

As LambdaTest grew, we expanded the platform into Test Intelligence, Visual Regression Testing, Accessibility Testing, API Testing, and Performance Testing, covering the entire testing lifecycle. These capabilities enabled teams to test any stack, on any technology, at enterprise scale.

Over time, we rebuilt the architecture to be AI-native from the ground up. What began as LambdaTest's high-performance testing cloud has now evolved into TestMu AI, an AI-native, multi-agent platform redefining modern quality engineering.

We chose the name TestMu AI to reflect our shift towards intelligent, autonomous testing. While our identity has changed, our core technology and commitment to the testing community stay the same.

👉 Find [LambdaTest's New Home](https://www.testmuai.com/).

### 🔭 Explore TestMu AI

The same infrastructure LambdaTest customers relied on, now delivered through autonomous AI agents.

- [KaneAI](https://www.testmuai.com/kane-ai/)
- [Agent-to-Agent Testing](https://www.testmuai.com/agent-to-agent-testing/)
- [HyperExecute](https://www.testmuai.com/hyperexecute/)
- [Real Device Cloud](https://www.testmuai.com/real-device-cloud/)
- [Pricing](https://www.testmuai.com/pricing/)
- [Documentation](https://www.testmuai.com/support/docs/)