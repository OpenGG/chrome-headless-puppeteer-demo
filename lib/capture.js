const path = require('path');

const puppeteer = require('puppeteer');

const devices = require('puppeteer/DeviceDescriptors');

const iPhone = devices['iPhone 6'];

const wait = (timeout) => {
  if (!timeout) {
    return null;
  }
  return new Promise(resolve =>
    setTimeout(resolve, timeout)
  );
};

const Capture = () => {
  let browser = null;

  const prepare = () => {
    if (browser) {
      return browser;
    }

    browser =
      puppeteer.launch()
        .then(b => {
          browser = b;
          return b;
        }, (err) => {
          browser = null;
          throw err;
        });

    return browser;
  };

  const capture = async (url, timeout = 1000, waitDur = 0) => {
    const browser = await prepare();

    const page = await browser.newPage();

    await page.emulate(iPhone);

    await page.goto(url, {
      timeout,
      waitUntil: 'domcontentloaded',
    });

    await wait(waitDur);

    const buff = await page.screenshot();

    await page.close();

    return buff;
  };

  return capture;
};

module.exports = Capture;
