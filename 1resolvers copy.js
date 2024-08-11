import { users, quotes } from "./fakedata.js";

const resolvers = {
    Query: {
        greeting: () => "Hello world",
        users: () => users,
        quotes: () => quotes,
        usersWithQuotes: () => users,
        user:(_,args)=>users.find((user)=>user.id == args.id),
        iquotes:(_,args)=>quotes.filter((quote)=>quote.by == args.by)
    },
    UsersWithQuote: {
        quotes: (usr) => quotes.filter((quote) => quote.by == usr.id)
    },

    Mutation:{
        signupUser: (_,{FirstName,LastName,Email,Password}) => {
            const id = users[users.length -1].id + 1;
            users.push({
                id, FirstName,LastName,Email,Password

            })
            return users.find((user)=>user.id == id);
        },
        registerUser: (_,{UserNew})=>{
            const id = users[users.length-1].id + 1
            users.push({
                id,
                ...UserNew
            })
            return users.find((user)=>user.id == id)
        }
    }

}

export default resolvers