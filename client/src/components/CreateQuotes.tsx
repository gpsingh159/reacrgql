import { useMutation } from "@apollo/client";
import { ChangeEvent, FormEvent, useState } from "react";
import { CREATE_QUOTE } from "./gqloperation/mutations";
import { Link } from "react-router-dom";
type Quote = {
    quote:string,
    by?:string
}
const CreateQuotes = () => {
    const [formData, setFormData] = useState<Quote>({quote:''});
    // const navigate = useNavigate();
    const [createQuote, { data, loading, error }] = useMutation(CREATE_QUOTE,{
        onCompleted:()=>{
          //  navigate("/")
        },
        refetchQueries:[
            'QuotesWithName',
            'getMyProfile',
            'getUserById'
        ]
    })
    if (loading) return <h1>Loading</h1>

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData)
        createQuote({
            variables: {
                name:formData.quote
            }
        })

    }
   
    return (
        <>


            <div className="container my-container">
                <div className="card card-panel hoverable ">
                    {
                        error && <div className='red card-panel'>{error.message}</div>
                    }
                    {
                        data && <div className='green card-panel'>{data.quote}</div>
                    }
                    <div className="cart-content">
                        <span className="card-title">Create Quoate</span>
                        <form action="" onSubmit={handleSubmit}>
                            <input type="text" placeholder='Write your quote here' name='quote' onChange={inputChange} required />

                            <button className='btn #673ab7 deep-purple waves-effect waves-light' type='submit'>Submit</button>

                            <Link className="right" to="/">View Quotes</Link>
                            
                            
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateQuotes