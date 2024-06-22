import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './config.js'
import { quotes } from './fakedata.js'


const User = mongoose.model('User')
const Quote = mongoose.model('Quote')
// parent, args->{}, context, info
const resolvers = {
    Query: {
        users: async () => await User.find({}),
        user: async (_, { _id }) => await User.findOne({ _id }),
        quotes: async () => await Quote.find({}),
        iquotes: async (_, { by }) => await Quote.find({ by }),
        quotesWithName: async () => await Quote.find({}).populate("by", "_id firstName"),
        myprofile: async (_, args, { userId }) => {
            if (!userId) {
                throw new Error("You must be logged in")
            }
            return await User.findOne({_id:userId})
        },
    },
    User: {
        quotes: async (usr) => await Quote.find({ by: usr._id })
    },
    Mutation: {

        signupUser: async (_, { UserNew }) => {
            console.log("server..", UserNew)
            const user = await User.findOne({ email: UserNew?.email })
            console.log(user);
            if (user) {
                throw new Error("User already exists with same emailId")
            }
            const hashPassword = await bcrypt.hash(UserNew.password, 12)
            console.log(hashPassword)
            const newUser = new User({
                ...UserNew,
                password: hashPassword
            })
            const usr = await newUser.save();
            console.log(usr);
            return usr;
        },
        singinUser: async (_, { userSignin }) => {
            const user = await User.findOne({ email: userSignin.email })
            if (!user) {
                throw new Error("Email id does not exists.")
            }
            console.log(userSignin.password, user.password);
            const domatch = await bcrypt.compare(userSignin.password, user.password)
            console.log("domatch----", domatch);
            if (!domatch) {
                throw new Error("Password does not match.")
            }

            const token = jwt.sign({ userId: user._id }, JWT_SECRET);
            return { token }
        },
        // first-root or parent, second variable and third context
        createQuote: async (_, { name }, { userId }) => {
            if (!userId) {
                throw new Error("You must be logged in")
            }
            const newQuote = new Quote({
                name,
                by: userId
            })
            await newQuote.save();
            return "Quote has been created successfully.";
        }


    }

}

export default resolvers