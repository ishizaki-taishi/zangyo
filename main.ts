import * as puppeteer from "puppeteer";

const clientId = 0;
const email = "";
const password = "";

type Date = {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: 0 | 15 | 30 | 45;
};

const targetDate: Date = {
  year: 2020,
  month: 12,
  day: 25,
  hours: 21,
  minutes: 0
};

const description = "にゃーん";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1260, height: 600 });

  await page.goto("https://ssl.jobcan.jp/login/pc-employee-global");

  await page.screenshot({ path: "1.png" });

  await page.type("#client_id", clientId.toString());
  await page.type("#email", email);
  await page.type("#password", password);

  await page.screenshot({ path: "2.png" });

  await Promise.all([page.click("button[type=submit]"), page.waitForNavigation()]);

  await page.goto("https://ssl.jobcan.jp/employee/over-work/new");

  await page.screenshot({ path: "3.png" });

  await page.select("#over_work_year", targetDate.year.toString());
  await page.select("#over_work_month", targetDate.month.toString());
  await page.select("#over_work_day", targetDate.day.toString());
  await page.select("#end_h", (targetDate.hours - 5).toString());
  await page.select("#end_m", targetDate.minutes.toString());
  await page.type("textarea", description);

  await page.screenshot({ path: "4.png" });

  await Promise.all([page.click(".btn-block>input"), page.waitForNavigation()]);

  await page.screenshot({ path: "5.png" });

  // 申請ボタンを押す
  // await Promise.all([page.click(".btn-block>input"), page.waitForNavigation()]);

  await page.screenshot({ path: "6.png" });

  await browser.close();
})();
