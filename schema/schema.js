//Bring graphql in the action
const graphql = require("graphql");

// destructuring the Properties provieded by the graphql before using them
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql;

//   create a graphQLObjectType Of a presence of data  or User in our case.
//   Below the example of the object Type defination
//   an GraphQlObjectType accepts two properties like
//   name:String --> defines the name of the object  (in Our case the object is User)
//   fields:{}  ---> Defines the properties of the Object we wann create (in our case user's id, name, age and its Types)
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});
