import gql from 'graphql-tag';

const typeDefs = gql`
type Query{
greeting: String
users:[User]
quotes:[Quote]
usersWithQuotes:[UsersWithQuote]
user(id:ID!): UsersWithQuote
iquotes(by:ID!):[Quote]
}
type User{
id:ID!
FirstName:String
LastName:String
Email:String
}
type Quote{
name:String,
by:ID
}

type UsersWithQuote{
id:ID!
FirstName:String
LastName:String
Email:String
quotes:[Quote]
}

type Mutation{
signupUser(FirstName:String!,LastName:String!,Email:String!,Password:String!):User
registerUser(UserNew:UserInput):User
}

input UserInput {
FirstName:String!
LastName:String!
Email:String!
Password:String!
}
`

export default typeDefs