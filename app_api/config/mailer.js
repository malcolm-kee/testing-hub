const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
sendgrid.setSubstitutionWrappers('{{', '}}');

const targetUrl = process.env.URL;
const verifyEmailPath = '/verify-account/';

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
        verifyEmailPath,
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

module.exports.sendAccountCreatedEmail = function sendAccountCreatedEmail({ to, name }) {
  return new Promise((resolve, reject) => {
    const msg = {
      to,
      from: 'congrats@testinghub.com',
      subject: 'Testing Hub - Account Created',
      html: '<p></p>',
      templateId: process.env.ACCOUNT_CREATED_TEMPLATE_ID,
      substitutions: {
        name,
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
