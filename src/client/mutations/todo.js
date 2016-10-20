/* @flow */

export const createTodo = `
  mutation AppMutation($input: String) {
    createTodo(input: $input) {
      id
    }
  }
`;
