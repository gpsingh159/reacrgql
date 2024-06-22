import gql from 'graphql-tag';

export const GET_ALL_QUOTES = gql`
query QuotesWithName {
  quotes:quotesWithName {
    name
    by {
        _id
        firstName
     }
  }
}
`

export const GET_MY_PROFILE = gql`
query getMyProfile {
  user:myprofile{
  firstName
  lastName
  email
  quotes{
  name
  }
  }
}
`

export const GET_USER_BY_ID = gql`
query getUserById($id: ID) {
  user(_id: $id) {
  email
  firstName
  lastName
  _id  
  quotes {
    name
  }
  }
}
`