//Bring graphql in the action
const graphql = require("graphql");
//helper library that helps us to work with the collection and data.
// const _ = require('lodash');

//axios is Promise based HTTP client for the browser and node.js
const axios = require("axios");
const API = "http://localhost:3004";

// destructuring the Properties provieded by the graphql before using them
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: "Company",
  // to avoid an error of defination . or to implement circular relationship between types
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios
          .get(`${API}/companies/${parentValue.id}/users`)
          .then(res => res.data)
          .catch(err => console.log(err));
      }
    }
  })
});

//   create a graphQLObjectType Of a presence of data  or User in our case.
//   Below the example of the object Type defination
//   an GraphQlObjectType  accepts two properties like
//   name:String --> defines the name of the object  (in Our case the object is User)
//   fields:{}  ---> Defines the properties of the Object we wann create (in our case user's id, name, age and its Types)
const UserType = new GraphQLObjectType({
  name: "User",
  // to avoid an error of defination
    fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        // console.log(parentValue )
        return axios
          .get(`${API}/companies/${parentValue.companyId}`)
          .then(res => res.data);
      }
    }
  })
});

// root queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      //  type of the data we wants to get
      type: UserType,
      // define the type of the args we wants to pass as ana args( here for example id having type of GraphQLString)
      // When we pass and arg id it returns user: UseType
      args: { id: { type: GraphQLString } },
      // is the function that goes back to database and brings the required actual data
      // parentValue :  nt gonn use
      // args: will contains a args we passing (in our case "Id")
      resolve(parentValue, args) {
        //lodash function .find accepts two args frst data collaactiona nd , id using to find data within the collation and returning it
        return axios
          .get(`${API}/users/${args.id}`)
          .then(res => res.data)
          .catch(error => console.log(error));
        // as This axios returns data in the form of { data:{ firstname :"aa"} ..}
      }
    },
    // Multiple root query
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`${API}/companies/${args.id}`)
          .then(res => res.data)
          .catch(error => console.log(error));
      }
    }
  }
});

// mutation defination
const mutation = new GraphQLObjectType({
      name: "Mutation",
      fields: {
        addUser: {
          type: UserType, 
          args: {
            firstName : {type: new GraphQLNonNull(GraphQLString)},
            age: {type : new GraphQLNonNull(GraphQLInt)},
            companyID : {type : GraphQLString}
          },
          resolve(parentValue,{firstName,age, companyID}){
                return axios.post(`${API}/users/`,{ firstName, age, companyID })
                .then(res=> res.data).catch(err=>console.log(err))
          }
        }
      }
})





module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
