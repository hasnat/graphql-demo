import Schema from 'graph.ql';
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
`, {
  Query: {
    browsers(root, { sortBy, sortOrder, limit }, { connection }) {
      return connection.allBrowsers(sortBy, sortOrder, limit);
    }
  },
  Browser: {
    versions(root, options, { connection }) {
      return connection.versionsForBrowser(root.name);
    }
  },
});

export default schema.schema;