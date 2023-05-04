# GarageMan

Project by Giovanni Quevedo, Krimika Keemtee, Aaron Villasenor, Aster Lee, Andrew De La Rosa
https://github.com/GioEpic123/GarageManager
---

## Intro

GarageMan is an online garage management system allowing users to make tickets for parking. GarageMan currently supports on-demand tickets (for drive-up parking) and reservations for parking in the future.

GarageMan is built on React.js, using Javascript and Typescript to generate the front end, and uses Firebase firestore for backend api calls.

---

## Usage

### For Online Runs:

GarageMan is currently being hosted by Firebase, so local running isn't necessary. You can use the app by navigating to this link:

https://garageman-d75af.web.app/

### For local Runs:

**Setup:**

To run the project, first navigate to the `garage_man` directory using the cd command, like so:

` $ cd garage_man`

At this point, you need to install npm packages, assuming you have npm and Node.js installed.

Using your command line, install the required dependancies:

` $ npm install`

**Local runs:**

If you want to host the site on your local machine, run

` $ npm start`

You browser should automatically boot open and display the webpage on your local port. If this doesn't happen for whatever reason, enter the url http://localhost:3000/ into your browser.

**Deployment:**

If you wish to create a new build of the project using firebase hosting, you need to create a web optimized build. Enter the following commmand to do so:

` $ npm run build`

This creates an optimized build in the `garage_man/build` folder. To deploy this build onto firebase, run the following command:

` $ firebase deploy`

You should recieve a confirmation within the command line/terminal indicating the deployment was successful. You can then access the deployment using the link it returned:

https://garageman-d75af.web.app/
