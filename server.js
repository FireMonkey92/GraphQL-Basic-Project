// import a express function
const express = require('express');
// import expressGraphQL Middleware to proviode gluecode between our EXPRESSJS And GRAPHQL
const expressGraphQL = require('express-graphql');

// create an app const variable of express function
const  app = express();
const schema = require('./schema/schema');

// tell The express.js to use the GraphQL middleware
// Schema is madetory to pass alog with the Options/Settings Object
app.use('/graphql', expressGraphQL({
    //passing the schema 
    schema,
    // for the development use, (graphiql is a app designed by graphiql devs to roam throught data firing queris in browsers)
    graphiql : true
    // 
}))


// create a server running in port Specified localhost:4000
app.listen(4000,()=>{
    console.log('Server Listning...')
});