import CreateQuotes from "./CreateQuotes";
import Home from "./Home";
import Login from "./Login";
import NotFound from "./NotFound";
import OtherUserProfile from "./OtherUserProfile";
import Profile from "./Profile";
import Register from "./Register";

export const routes = [
    {
        path:"/",
        element: <Home/>
    },
    {
        path:"/login",
        element: <Login/>
    },
    {
        path:"/signup",
        element: <Register />
    },
    {
        path:"/create",
        element: <CreateQuotes />
    },
    {
        path:"/profile",
        element: <Profile />
    },
    {
        path:`/profile/:userid`,
        element: <OtherUserProfile />
    },
    {
        path:`*`,
        element: <NotFound />
    },
]
