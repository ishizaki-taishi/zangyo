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
  await page.goto("https://ssl.jobcan.jp/login/pc-employee-global");

  await page.screenshot({ path: "1.png" });

  await page.evaluate(
    (clientId: number, email: string, password: string) => {
      document.querySelector<HTMLInputElement>("#client_id").value = clientId.toString();
      document.querySelector<HTMLInputElement>("#email").value = email;
      document.querySelector<HTMLInputElement>("#password").value = password;
    },
    clientId,
    email,
    password
  );

  await page.screenshot({ path: "2.png" });

  await Promise.all([page.click("button[type=submit]"), page.waitForNavigation()]);

  await page.goto("https://ssl.jobcan.jp/employee/over-work/new");

  await page.screenshot({ path: "3.png" });

  await page.evaluate(
    (targetDate: Date, description: string) => {
      const selects = document.querySelectorAll<HTMLSelectElement>("select");
      selects[0].value = targetDate.year.toString();
      selects[1].value = targetDate.month.toString();
      selects[2].value = targetDate.day.toString();
      selects[5].value = (targetDate.hours - 5).toString();
      selects[6].value = targetDate.minutes.toString();
      document.querySelector<HTMLTextAreaElement>("textarea").value = description;
    },
    targetDate,
    description
  );

  await page.screenshot({ path: "4.png" });

  await Promise.all([page.click(".btn-block>input"), page.waitForNavigation()]);

  await page.screenshot({ path: "5.png" });

  // 申請ボタンを押す
  // await Promise.all([page.click(".btn-block>input"), page.waitForNavigation()]);

  await page.screenshot({ path: "6.png" });

  await browser.close();
})();
