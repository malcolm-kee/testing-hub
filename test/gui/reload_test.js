const puppeteer = require('puppeteer');

const storeFile = require('./storeFile');

async function reload({ domain }) {
	const browser = await puppeteer.launch({
		ignoreHTTPSErrors: true
	});
	const page = await browser.newPage();
	const screenshots = [];

	// step 0
	try {
		await page.goto(`${domain}/prepaid-reloads`);
		const screenshot = await page.screenshot({ fullPage: true });
		screenshots.push(screenshot);
	} catch (error) {
		throw error;
	}

	// step 1
	try {
		const reloadOption = await page.$('[data-productuid="249423"]');
		await reloadOption.click();
		const mobileNumInput = await page.$('#reloadDetailsForm [name="mobileNum"]');
		await mobileNumInput.type('0109238211');
		const emailInput = await page.$('#reloadDetailsForm [name="email"]');
		await emailInput.type('quantum.of.dream@gmail.com');
	} catch (error) {
		console.log(error);
	} finally {
		const screenshot = await page.screenshot({ fullPage: true });
		screenshots.push(screenshot);
	}

	// step 2
	try {
		const proceedBtn = await page.$('#proceedBtn');
		await Promise.all([page.waitForNavigation(), proceedBtn.tap()]);
	} catch (error) {
		console.log(error);
	} finally {
		const screenshot = await page.screenshot({ fullPage: true });
		screenshots.push(screenshot);
	}

	// step 3
	try {
		const payBtn = await page.$('#payBtn');
		await Promise.all([page.waitForNavigation(), payBtn.tap()]);
	} catch (error) {
		console.log(error);
	} finally {
		const screenshot = await page.screenshot({ fullPage: true });
		screenshots.push(screenshot);
	}

	// step 4
	try {
		const cancelBtn = await page.$('#btncancel');
		await Promise.all([
			cancelBtn.click(),
			page.waitForNavigation({
				waitUntil: 'networkidle',
				networkIdleTimeout: 3000
			})
		]);
	} catch (error) {
		console.log(error);
	} finally {
		const screenshot = await page.screenshot({ fullPage: true });
		screenshots.push(screenshot);
	}

	storeFile.storeScreenshots(screenshots);

	await browser.close();
}

reload({ domain: 'http://uat.digi.com.my/cs/ecomm' });
