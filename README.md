## Synopsis

This project is used as a demo page for a testing-hub page, in which tester can easily have a list of all testing links.

## Setup

1. Install heroku
2. Install mongodb
3. Unzip the file /setup_file/mongolocal_dump.zip
4. Go to the path that you unzip the file and run the following command
```
mongorestore -h localhost:27017 -d DSOPortal ~/tmp/mongodump/DSOPortal
```
6. Go to the root of this project and run the following command
```
heroku local
```
