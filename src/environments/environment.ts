// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // APIUrl: 'https://api.bookfon.com', // <-- URL Production
  APIUrl: 'https://testbookfon.bookfon.com', // <-- URL development
  // APIUrl: 'http://bookfonstag.us-east-1.elasticbeanstalk.com', // <-- URL Local
  firebaseConfig: {
    apiKey: "AIzaSyAL81QAR_z-odJJ4cNgJuPozc2H0gWPa7w",
    authDomain: "bpb-training.firebaseapp.com",
    projectId: "bpb-training",
    storageBucket: "bpb-training.appspot.com",
    messagingSenderId: "532152662318",
    appId: "1:532152662318:web:d221b87617f96e2bc562bf",
    measurementId: "G-2QG6ZM2D3Z",
  },
  FullCalendarKey:'0425202178-fcs-1671111408'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
