import { launch, Page } from "puppeteer";

describe("Protractor Test", function () {
	it("should open 'Google' in browser", async () => {
		const browser = await launch({
			headless: false,
		});

		const page: Page = await browser.newPage();
		await page.setViewport({
			width: 1440,
			height: 900,
			deviceScaleFactor: 1,
		});

		await page.goto("https://www.google.com.pk");
		await page.waitForTimeout(5000);

		console.log("Ran Test 1");
	});

	it("Test 2 - 2", async () => {
		console.log("Ran Test 2");
	});

	it("Test 3", async () => {
		console.log("Ran Test 3");
	});

	it("Test 4", async () => {
		console.log("Ran Test 4");
	});

	it("Test 5", async () => {
		console.log("Ran Test 5");
	});
});
