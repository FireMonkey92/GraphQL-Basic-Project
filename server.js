// import an express function
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
    
}))


app.set('port', process.env.PORT || 4000);
// create a server running in port Specified localhost:4000
app.listen(app.get('port'),()=>{
   console.log(`Server running on PORT: ${app.get('port')}`);
});