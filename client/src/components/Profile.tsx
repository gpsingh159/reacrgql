import { useQuery } from "@apollo/client"
import { GET_MY_PROFILE } from "./gqloperation/queries"
import { useNavigate } from "react-router-dom"
type Quoate = {
    name:string,
    by?:string
}
const Profile = () => {
    const navigate = useNavigate();
    const{data,loading,error} = useQuery(GET_MY_PROFILE,{
        fetchPolicy: 'cache-and-network'
    })
    if(loading) return "Profile is loading";
    if(error){
        console.log(error.message);
        
    }
    if(!localStorage.getItem('token')){
        navigate("/login")
        return "<h5>Unauthorized</h5>"
    }

    return (
        <>
            <div className="container my-container">
                <div className="card card-panel hoverable ">
                    <span className="card-title">Profile</span>
                    <div className="cart-content">
                        <div className="center-align">
                            <img className="circle" style={{border:"2px solid black"}} src={`https://robohash.org/${data.user.firstName}?size=200x200`} />
                            <h5>{data.user.firstName}</h5>
                            <h5>{data.user.email}</h5>
                        </div>
                    <h5>Your quotes</h5>
                    {
                        data.user.quotes.map((quote:Quoate,i:number)=>{
                           return  <blockquote key={i}>
                            <h6>{quote.name}</h6>
                        </blockquote>
                        })
                    }
                       
                      
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile