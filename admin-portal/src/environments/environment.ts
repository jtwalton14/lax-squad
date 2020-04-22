// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // test API
  apiUrl: "http://localhost:3000",

  firebase: {
    apiKey: "AIzaSyD6PH4P8QWz2-b7CPHPNm98dk0znqRcGXM",
    authDomain: "tmtlax-dev.firebaseapp.com",
    databaseURL: "https://tmtlax-dev.firebaseio.com",
    projectId: "tmtlax-dev",
    storageBucket: "tmtlax-dev.appspot.com",
    messagingSenderId: "277948398056",
    appId: "1:277948398056:web:2c1a4740d5dda838750c5d",
    measurementId: "G-HNLTWTG8J1"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
