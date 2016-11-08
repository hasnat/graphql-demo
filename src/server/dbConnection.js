/* @flow */
import loki from 'lokijs';
const db = new loki('./db/traffic_data.json');
let dbConnection = {};
let BrowserDbMap = (obj) => ({name: obj.browser_name, traffic: {visits: obj.traffic}});

let OSDbMap = (obj) => ({name: obj.browser_name});
let BrowserVersionMap = (obj) => ({versionNumber: obj.browser_version, traffic: {visits: obj.traffic}});
let OSVersionDbMap = (obj) => ({name: obj.browser_name});
let TrafficDbMap = (obj) => ({visits: obj.traffic});



dbConnection.trafficCollection = new Promise((resolve) => {
  db.loadDatabase({}, () => {
    resolve(db.getCollection('traffic_collection'));
  });
})
dbConnection.allBrowsers = async (sortBy = 'traffic', sortOrder = true, limit = 20) => {
  return (await dbConnection.trafficCollection).mapReduce(BrowserDbMap, (objs) => {
    let dist = [];
    let distCheck = [];
    objs.forEach((elem) => {
      if (distCheck.indexOf(elem.name) === -1) {
        dist.push(elem);
        distCheck.push(elem.name);
      }
    });
    return dist;
  });
}
dbConnection.versionsForBrowser = async (browserName) => {
  // var findBy = {'$and': [{ 'browser_name': browserName }]};
  return (await dbConnection.trafficCollection).mapReduce((obj) => obj, (objs) => {
    let dist = [];
    let distCheck = [];
    objs.forEach((elem) => {
      if (elem.browser_name == browserName && distCheck.indexOf(elem.browser_version) === -1) {
        dist.push(elem);
        distCheck.push(elem.browser_version);
      }
    });
    return dist;
  }).map(BrowserVersionMap);
}
dbConnection.findBrowserByName = (name) => {
  var findBy = {'$and': [{ 'name': name }]};
  return dbConnection.trafficCollection.chain().find(findBy).limit(1).data();
}

dbConnection.findTodo = (count) => {
  return count ? data.todos.slice(0, count) : data.todos;
}

dbConnection.createTodo = (text) => {
  const todo = {
    id: 't-' + idx++,
    text: text,
    owner: 'u-1',
    createdAt: (new Date()).toString(),
  };
  data.todos.push(todo);
  return todo;
}

dbConnection.findUser = () => {
  return data.users[0];
}
export default dbConnection;