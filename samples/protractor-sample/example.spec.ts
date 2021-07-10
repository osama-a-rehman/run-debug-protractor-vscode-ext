import { browser } from 'protractor';
import {} from 'jasmine';

describe('Protractor Test', async () => {
	it('should open angularjs.org in browser', async () => {
		const expectedUrl = 'https://angularjs.org/';

		await browser.get(expectedUrl);

		const actualUrl = await browser.getCurrentUrl();
		expect(actualUrl).toBe(expectedUrl);
	});

	it('should open angular.io in browser', async () => {
		const expectedUrl = 'https://angular.io/';

		await browser.get(expectedUrl);

		const actualUrl = await browser.getCurrentUrl();
		expect(actualUrl).toBe(expectedUrl);
	});
});
