const puppeteer = require("puppeteer");

console.log(`Puppeteer path: ${puppeteer.executablePath()}`);

exports.config = {
	specs: ["example.spec.ts"],
	framework: "jasmine",
	capabilities: {
		browserName: "chrome",
		chromeOptions: {
			args: ["--headless"],
			binary: puppeteer.executablePath(),
		},
	},
	directConnect: true,
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 45000,
		print: function () {},
	},
	beforeLaunch: function () {
		require("ts-node").register({
			project: "./tsconfig.json",
		});
	},
};
