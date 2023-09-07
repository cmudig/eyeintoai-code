# Eye Into AI (Our AI GWAP)

### `cd frontend`

## First Time Setup

Before running/deploying, make sure you have configured the .env file in the 'frontend' directory.  The .env has not been committed to git, but can be found in our shared google drive.

For those developing this game for their own research, the .env file contains all of the details related to the firebase configuration. You can see what this file should look like in the example-env.txt file.

In the 'frontend' directory, you can then run:

### `npm install`

### `firebase login`

At this point you may need to run the command `firebase use --add` and add your firebase project

### `firebase init`

* Select Hosting, Emulators, and Firestore
  * For the emulators init: select Firestore, Database and Hosting emulators
* Follow all of the prompts for set up

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### `gcloud app deploy`

This will deploy it to our google cloud.

### `npm run deploy`

This will deploy the frontend to Github Pages. You must be in the frontend directory for this to work.
