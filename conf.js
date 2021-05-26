var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',

	capabilities: {
		'browserName': 'chrome',
		'chromeOptions': {
			'excludeSwitches': ['enable-automation'],
			'args': [
				'incognito',
				'disable-extensions',
				'enable-automation',
				'disable-infobars',
				'start-maximized',
				'enable-crash-reporter-for-testing'],
			'w3c': false
		}
	},
	// multiCapabilities: [{
	// 	'browserName': 'firefox'
	// }, {
	// 	'browserName': 'chrome'
	// }],

	specs: [
		//'testcases/NewTestCases_Spec.js'
		'testcases/SampleTest_Spec.js'
	],

	suites: {
		regression: 'testcases/**/**.js',
	},

	onPrepare: function () {
		browser.manage().window().maximize();
		browser.manage().timeouts().implicitlyWait(5000);

		

		jasmine.getEnv().addReporter(new HtmlReporter({
			takeScreenshotsOnlyOnFailures: true,
			baseDirectory: 'Reports/screenshots'
		}).getJasmine2Reporter());

		var AllureReporter = require('jasmine-allure-reporter');
		jasmine.getEnv().addReporter(new AllureReporter({
			resultsDir: 'allure-results'
		}));

		var reportName = "Protractor_Test_Report_" + Date.now();
		var jasmineReporters = require('jasmine-reporters');
		jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
			consolidateAll: true,
			savePath: './regressiontestresults/',
			filePrefix: 'xmlresults'
		}));
		jasmine.getEnv().addReporter(new HtmlReporter({
			baseDirectory: 'D:\\BUSProject\\Reports\\' + reportName,
			docTitle: 'Test Execution Report',
			docName: 'index.html',
			screenshotsSubfolder: 'images',
			jsonsSubfolder: 'jsons'
		}).getJasmine2Reporter());
	},
};