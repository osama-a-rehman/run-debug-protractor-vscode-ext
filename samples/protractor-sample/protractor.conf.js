exports.config = {
	specs: [],
	framework: 'jasmine',
	capabilities: {
		browserName: 'chrome',
		chromeOptions: {},
	},
	directConnect: true,
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 45000,
		print: function () {},
	},
	beforeLaunch: function () {
		require('ts-node').register({
			project: './tsconfig.json',
		});
	},
	seleniumAddress: 'http://localhost:4444',
};
