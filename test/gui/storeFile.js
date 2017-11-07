const fs = require('fs');
const path = require('path');

module.exports.storeScreenshots = async function exportStoreScreenshots(screenshots) {
	const timestamp = new Date()
		.toISOString()
		.replace(/T/, '_')
		.replace(/:/g, '')
		.replace(/\..+/, '');
	const folderName = `capture_${timestamp}`;
	await fs.mkdir(folderName, err => {
		if (err) {
			throw err;
		}
	});

	await Promise.all(
		screenshots.map(async (screenshot, index) => {
			await fs.writeFile(path.join(folderName, `step${index}.png`), screenshot, err => {
				if (err) {
					throw err;
				}
			});
		})
	);

	return true;
};
