## Synopsis

This project is used as a demo page for a testing-hub page, in which tester can easily have a list of all testing links.

Demo site: https://vast-journey-10806.herokuapp.com/

## Setup

1. Install heroku
2. Install mongodb
3. Unzip the file /setup_file/mongolocal_dump.zip
4. Go to the path that you unzip the file and run the following command
```
mongorestore -h localhost:27017 -d DSOPortal ~/tmp/mongodump/DSOPortal
```
5. Add a .env file at the root directory with the following contents
```
JWT_SECRET=yourSecretKey
SENDGRID_API_KEY=sendGridApiKeyFromYourSendGridAccount
VERIFY_EMAIL_TEMPLATE_ID=your-Send-Grid-TemplateId-1
ACCOUNT_CREATED_TEMPLATE_ID=your-Send-Grid-TemplateId-2
URL=http://localhost:3000
```
*You need to register for a sendgrid account and create your own verify email and account creation email. For more details, refer to https://github.com/sendgrid/sendgrid-nodejs/tree/master/packages/mail*
6. Go to the root of this project and run the following command
```
heroku local
```
7. Run `yarn dev`

## Pending changes

1. Added redux for state management - Done
2. Added jest unit testing - Done
3. Refactoring structure for admin route - WIP
4. Sortable table for sprint items - WIP
