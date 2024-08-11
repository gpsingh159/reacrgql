import gql from 'graphql-tag';

export const SIGNUP_USER = gql`
mutation SignupUser($userNew: UserInput) {
  User:signupUser(UserNew: $userNew) {
    firstName
  }
}
`
export const LOGIN_USER = gql`
mutation SinginUser($userSignin: UserSigninInput!) {
  user:singinUser(userSignin: $userSignin) {
    token  
  }
}
`

export const CREATE_QUOTE =gql`
mutation CreateQuote($name: String) {
  quote:createQuote(name: $name)
}
`


