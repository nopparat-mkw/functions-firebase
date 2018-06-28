'use strict'
const cors = require('cors')({origin: true});
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

//The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

// Get a database reference to our posts
var db = admin.database();
exports.listcontent = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    if(request.method === 'GET'){
      var ref = db.ref("contents");
      ref.once("value", function(snapshot) {
        response.contentType('application/json');
 
       
        let contentsList = [];
     
        snapshot.forEach((child) => {
          let slide = child.val()
          slide._key = child.key
          contentsList.push(slide);
         });
 
        response.send(JSON.stringify(contentsList));
      });
   }
  })
});