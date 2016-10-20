import Schema from 'graph.ql';
var schema = Schema(`
  enum Test { ONE, TWO }


  type TodoInput {
    text: String
  }
  
  # Todo type
  type Todo {
    # Todo id
    id: String
    # Todo text
    text: String
    owner: User
    # Todo creation date
    createdAt: String
  }
  
  type User {
    id: String
    name: String
    todos(count: Int): [Todo]
    createdAt: String
  }

  type Query {
    # Fetch the film by id
    viewer: User
    test: Test
  }

  type Mutation {
    createTodo(input: String): Todo
  }
`, {
  Todo: {
    owner(root, args, { connection }) {
      return connection.findUser();
    }
  },
  User: {
    todos(root, { count }, { connection }) {
      return connection.findTodo(count);
    }
  },
  Query: {
    viewer(root, { viewer }, { connection }) {
      return connection.findUser(viewer);
    }
  },
  Mutation: {
    createTodo(root, { input }, { connection }) {
      return connection.createTodo(input);
    }
  }
});

export default schema.schema;