# ScheduleIt !
This app simulates a calender of three meeting rooms: A,B,C.
you can add/edit/remove meetings for each of the rooms in a
weekly/monthly views.
**some important notes:**
* the app is fully client side and using localStorage + redux to
replace a database.
* to add/edit a meeting just double click on a cell
* the app is also mobile friendly
* you can run two simple tests of the meetings store object

## How to run the app
In your terminal go to the app root directory and run the following scripts:

### `npm install`
will install the all required node modules

### `npm run dev`
will run the app in dev mode.
you will be able to see the app in your local enviroment with a hot reloading (http://localhost:9002/)

### `npm run webpackBuild`
will build a bundled compiled js files of the app that you will find in the dist folder.
after the build you can open public/index.html to see the web page
(before it just change the path of the bundle.js inside index.html to be src='../dist/bundle.js')

### `npm run test`
will run simple jest tests on the meeting reducer that
testing the 'add' and 'delete' meeting actions

### Have fun :)