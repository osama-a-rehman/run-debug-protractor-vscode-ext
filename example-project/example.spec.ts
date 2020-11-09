import { launch, Page } from "puppeteer";

describe("Puppeteer Test", function () {
	it("should open google.com and wait for 5 seconds", async () => {
		try {
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
		} catch (error) {
			console.log(error);
		}

		console.log("Ran Test 1");
	});

	it("Test 2", async () => {
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
