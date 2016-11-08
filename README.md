npm install or yarn install
npm start

`http://localhost:3000`


`http://localhost:3000/graphql`
example GQL query

```
{
  browsers {
    name
    versions {
      versionNumber
      traffic {
        visits
      }
    }
  }
}
```