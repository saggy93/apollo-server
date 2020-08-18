const { ApolloServer, gql } = require('apollo-server');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const Event = require('./model/model');



// const url = `mongodb+srv://sagar:SoYKGk9X4eCm5MTn@cluster0.9jrrq.mongodb.net/MONGO_DB?retryWrites=true&w=majority`;
// const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(function (err) {
//   console.log("MONGOdb connected");   
//   db = client.db("MONGO_DB"); //mongodb database name
// });


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.

  type Query {
    event: [event],
    events(_id: ID!): [event]
  }

  type event {
            _id: ID!
            title: String!
            avtar: String!
            songs: [songs]

            
        }
        type songs {
            id: String!
            name: String!
            composer: String!
            writer: String!
            moviename: String!
            rating: Float!
        }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
 
`;



  // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    event: async () => {
        values = await Event.find().then(res => { 
          return res });
        return values
      },
      async events(parent, args, context, info) { 
       
        console.log(args._id)
        values = await Event.find({_id:args._id}).then(res => {
            return res
        });
        return values
      },
  },
};


const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
mongoose.connect(`mongodb+srv://sagar:SoYKGk9X4eCm5MTn@cluster0.9jrrq.mongodb.net/MONGO_DB?retryWrites=true&w=majority`
    ).then(() => {
      server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
      });

    }).catch(err => {
        console.log(err);
    });