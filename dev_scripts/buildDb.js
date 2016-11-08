import loki from 'lokijs';
import fs from 'fs';
var csvData = fs.readFileSync('./db/traffic_data.csv').toString();
var db = new loki('./db/traffic_data.json')
db.loadDatabase({}, function() {
	console.log(db.listCollections())

	var trafficCollection = db.addCollection('traffic_collection', {
		indices: ['browser_name', 'browser_version', 'os_name', 'os_version']
	})

	csvData.split("\n").map((line) => {
		var [country_code,browser_name,browser_version,os_name,os_version,traffic] = line.split(',');
		browser_name = browser_name.replace(/"/g, '');
		trafficCollection.insert({country_code, browser_name, browser_version, os_name, os_version, traffic});
	});
	db.saveDatabase();
});