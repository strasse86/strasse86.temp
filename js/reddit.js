const query =  `
fragment repository on Repository {
  name
  nameWithOwner
  createdAt
  updatedAt
  isFork
  ref(qualifiedName: "master") {
    target {
      ... on Commit {
        history(first: 2, since: "2018-06-30T00:00:00Z") {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              messageHeadline
              authoredDate
              changedFiles
            }
          }
        }
		
      }
    }
  }
}

{
  bitcoin: repository(owner: "bitcoin", name: "bitcoin") { ...repository }
  stellar: repository(owner: "stellar", name: "stellar-core") {...repository }
}`


fetch("https://api.github.com/graphql", {
  method: 'POST',
  headers:{
    'Authorization': 'bearer ' + "3b98eae51a58b97f534dff1368110f71c8c88898"
  },
  body: JSON.stringify({ query  })
 
})
  .then(res => res.json())
  .then(res => console.log(res.data));
 
 
 
 
