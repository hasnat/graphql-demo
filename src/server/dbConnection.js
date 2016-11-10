/* @flow */
var sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/traffic.db');

let dbConnection = {
  Query: {
    browsers: (root, { sortBy, sortOrder, limit }, { connection }) => {
      return new Promise(resolve => db.all('SELECT distinct browser_name as name FROM traffic', (err, rows) => {
        resolve(rows);
      }))
    }
  },
  Browser: {
    //name:
    supportedOS: (root, options, { connection }) => {
      return new Promise(resolve => db.all('SELECT distinct os_name as name FROM traffic where browser_name = ?', [root.name], (err, rows) => {
        resolve(rows);
      }))
    },
    versions: (root, options, { connection }) => {
      return new Promise(resolve => db.all('SELECT distinct browser_version as versionNumber FROM traffic where browser_name = ?', [root.name], (err, rows) => {
        resolve(rows);
      }))
    },
    traffic: (root, options, { connection }) => {
      return new Promise(resolve => db.all('SELECT sum(traffic) as visits FROM traffic where browser_name = ?', [root.name], (err, rows) => {
        resolve(rows[0]);
      }))
    }
  },

  OS: {
    //name:
    browsers: (root, options, { connection }) => {
      return new Promise(resolve => db.all('SELECT distinct browser_name as name FROM traffic where os_name = ?', [root.name], (err, rows) => {
        resolve(rows);
      }))
    },
    versions: (root, options, { connection }) => {
      return new Promise(resolve => db.all('SELECT distinct os_version as versionNumber FROM traffic where os_name = ?', [root.name], (err, rows) => {
        resolve(rows);
      }))
    },
    traffic: (root, options, { connection }) => {
      return new Promise(resolve => db.all('SELECT sum(traffic) as visits FROM traffic where os_name = ?', [root.name], (err, rows) => {
        resolve(rows[0]);
      }))
    }
  },

  OSVersion: {
    //versionNumber:
    traffic: (root, options, { connection }) => {
      return new Promise(resolve => db.all('SELECT sum(traffic) as visits FROM traffic where os_version = ?', [root.name], (err, rows) => {
        resolve(rows[0]);
      }))
    }
  },

  BrowserVersion: {
    // versionNumber: String
    traffic: (root, options, { connection }) => {
      return new Promise(resolve => db.all('SELECT sum traffic FROM traffic where browser_name = ?', [root.name], (err, rows) => {
        resolve(rows);
      }))
    }
  }
};

export default dbConnection;
