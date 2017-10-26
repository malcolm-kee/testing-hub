const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
sendgrid.setSubstitutionWrappers('{{', '}}');

const targetUrl = process.env.URL;

module.exports.sendVerifyEmail = function sendVerifyEmail({ to, name, code }) {
	return new Promise((resolve, reject) => {
		const msg = {
			to,
			from: 'welcome@testinghub.com',
			subject: 'Welcome to Testing Hub!',
			html: '<p></p>',
			templateId: process.env.VERIFY_EMAIL_TEMPLATE_ID,
			substitutions: {
				name,
				code,
				targetUrl
			}
		};
		sendgrid
			.send(msg)
			.then(() => {
				resolve();
			})
			.catch(error => {
				reject(error.toString());
			});
	});
};
