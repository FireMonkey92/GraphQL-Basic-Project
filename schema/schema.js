//Bring graphql in the action
const graphql = require("graphql");
//helper library that helps us to work with the collection and data.  
const _ = require('lodash');


// destructuring the Properties provieded by the graphql before using them
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;


const users = [
  {id: '11' , firstName: 'Tanesh', age: '27'},
  {id: '23' , firstName: 'Sandeep', age: '21'},
  {id: '32' , firstName: 'Rajin', age: '24'},
  {id: '43' , firstName: 'Indushree', age: '24'}
]

//   create a graphQLObjectType Of a presence of data  or User in our case.
//   Below the example of the object Type defination
//   an GraphQlObjectType accepts two properties like
//   name:String --> defines the name of the object  (in Our case the object is User)
//   fields:{}  ---> Defines the properties of the Object we wann create (in our case user's id, name, age and its Types)
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

// root queries
//

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      //  type of the data we wants to get 
      type: UserType,
      // define the type of the args we wants to pass as ana args( here for example id having type of GraphQLString)
      // When we pass and arg id it returns user: UseType
      args: { id: { type: GraphQLString } },

      //is the function that goes back to database and brings the required actual data 
      // parentValue :  nt gonn use
      // args: will contains a args we passing (in our case "Id")
      resolve(parentValue, args){
                    //lodash function .find accepts two args frst data collaactiona nd , id using to find data within the collation and returning it
          return _.find(users, {id: args.id})
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery
});