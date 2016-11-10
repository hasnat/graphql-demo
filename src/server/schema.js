import Schema from 'graph.ql';
import dbConnection from './dbConnection.js';
var schema = Schema(`
  enum Test { ONE, TWO }

  type Browser {
    name: String
    supportedOS: [OS]
    versions: [BrowserVersion]
    traffic: Traffic
  }

  type OS {
    name: String
    browsers: [Browser]
    versions: [OSVersion]
    traffic: Traffic
  }
  
  type OSVersion {
    versionNumber: String
    traffic: Traffic
  }
  
  type BrowserVersion {
    versionNumber: String
    traffic: Traffic
  }
  
  type Traffic {
    visits: Int
  }
  
  type Query {
    browsers(sortBy: String, sortOrder: Boolean, limit: Int): [Browser]
  }
`, dbConnection);

export default schema.schema;