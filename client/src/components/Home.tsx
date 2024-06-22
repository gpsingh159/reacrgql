import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { GET_ALL_QUOTES } from "./gqloperation/queries"
import { Link } from "react-router-dom"

type Quote ={
    name:string,
    by:{
        firstName:string,
        _id:string
    }

}

const Home = () => {
    const {loading, error, data}=useQuery(GET_ALL_QUOTES,{

        fetchPolicy:"cache-and-network"
    })
    // useEffect(()=>{
    //     fetch("http://localhost:4000",{
    //         method:'post',
    //         headers:{
    //             "Content-Type":"application/json"
    //         },
    //         body:JSON.stringify({
    //             query:``
    //         })
    //     }).then((res)=>res.json()).then((data)=>{console.log(data)})
    // },[])
    if(loading) return <h1>Loading</h1>
    if(error){
        console.log(error.message);
    }
    
    if(!data.quotes.length){
        console.log(data)
        return <h5>No Quotes are available.</h5>
        
    }
    return (
        <>
            <div className="container my-container">
                <div className="card card-panel hoverable ">
                    <span className="card-title">All Quotes</span>
                    <div className="cart-content">

                        <h5>Your quotes</h5>
                        {data.quotes.map((quote:Quote,i:number) =>{
                            {console.log(quote)}
                           return  <blockquote key={quote.by._id+i}>
                            <h6>{quote.name}</h6>
                            <p className="right #e0e0e0 grey-text lighten-2">
                                {<Link to={`/profile/${quote.by._id}`}>~{quote.by.firstName}</Link>}
                                </p>
                        </blockquote>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home