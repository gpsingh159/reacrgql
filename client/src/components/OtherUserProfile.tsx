import { useQuery } from "@apollo/client"
import {  GET_USER_BY_ID } from "./gqloperation/queries"
import { useParams } from "react-router-dom"

type Quoate = {
    name:string,
    by?:string
}
const OtherUserProfile = () => {
    const {userid} = useParams()
    
    const{data,loading,error} = useQuery(GET_USER_BY_ID,{
        variables:{
            id:userid
        }
    })
    if(loading) return "Profile is loading";
    if(error){
        console.log(error.message);
        
    }
  

    return (
        <>
            <div className="container my-container">
                <div className="card card-panel hoverable ">
                    <div className="cart-content">
                        <div className="center-align">
                            <img className="circle" style={{border:"2px solid black"}} src={`https://robohash.org/${data.user.firstName}?size=200x200`} />
                            <h3>{data.user.firstName}</h3>
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

export default OtherUserProfile