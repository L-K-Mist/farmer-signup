// // Possibilities to use later
// "pouch-vue"
// "pouchdb-find"
// "pouchdb-live-find"

import PouchDB from "pouchdb-browser"
// PouchDB.plugin(require('pouchdb-find'));
PouchDB.plugin(require("pouchdb-upsert"));

var db = new PouchDB('farmer-app');

// db.remote = new PouchDB('https://foranserentaysedisunceal:7cee35e9bbd81f8a031154f6919cc4dd27d43661@168b7c02-9bb1-44ba-aa11-73d03311c8d4-bluemix.cloudant.com/controller_1');

// PouchDB.debug.enable('*');
// PouchDB.debug.disable()

db.info().then(function (info) {
    console.log(info);
})

export default db