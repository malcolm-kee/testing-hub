const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.sendVerifyEmail = function sendVerifyEmail({ to, name }) {
	return new Promise((resolve, reject) => {
		const msg = {
			to,
			from: 'welcome@testinghub.com',
			subject: 'Welcome to Testing Hub!',
			html: `<h1>Welcome ${name}!</h1>
			<p>Your account is created successfully.</p>`
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
