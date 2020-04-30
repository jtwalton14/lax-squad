# lax-squad
This repository is for the TMTlax.com implementation for dynamic color picking of lacrosse pockets.

Enclosed:

*ExpressJS API

*NodeJS Angular Admin Portal

*OpenCV C++ Program for color changing

## Installation
This was made to work on a unix system. Should work on any but mainly tested with Ubuntu and Debian.
Will need to install NodeJS with `sudo apt install nodejs`
1. `Git clone <repository>`
2.  `cd express-api/tmtlax_api/`
    * `node app.js`
    * ExpressAPI server is now running @ port 9321. can be accessed with `localhost:9321` or `<host>:9321`
    * Port can be changed in app.js  
3. cd back to root
4. [Admin portal setup](/admin-portal/README.md) 

## Using the API
1. On admin portal add your pockets and colors you want to use.
2. On your hosted site make a javascript call to `<host>:9321` or a routed url you have setup along the lines of:
    * `<host>:9321/<pocket index # (1+)>&<color 1>&<color 2>&<color 3>&<color 4>&<color 5>&<color 6>`
    * this will return an edited image of `<pocket index>` with colors edited in order from left->right. 
    * left string, middle string, right string, left lace, right lace, shooting string.
    * all other API calls are handled by the admin-portal. This is purely to edit images and return them to the site.
    
