import { useMutation } from '@apollo/client';
import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import { SIGNUP_USER } from './gqloperation/mutations';
import { GET_ALL_QUOTES, GET_MY_PROFILE, GET_USER_BY_ID } from './gqloperation/queries';

const Register: FC = () => {
    const [formData, setFormData] = useState({});
    const [singupUser, { data, loading, error }] = useMutation(SIGNUP_USER,{
        refetchQueries:[
            GET_ALL_QUOTES,
            GET_MY_PROFILE,
            GET_USER_BY_ID
        ]
    })
    if (loading) return <h5>Loading....</h5>
    
    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData)
        singupUser({
            variables:{
                userNew:formData
            }
        })
    }
    return (
        <>
            <div className="container my-container">
                {
                    error && <div className='red card-panel'>{error.message}</div>
                }
                {
                    data && data.User &&
                    <div className='green card-panel'>{data.User.firstName} is singup successfully. You can login now.!! </div>
                }
                <div className="card card-panel hoverable ">
                    <div className="cart-content">
                        <span className="card-title">Signup</span>
                        <form action="" onSubmit={handleSubmit}>
                            <input type="text" placeholder='FirstName' name='firstName' onChange={inputChange} required />
                            <input type="text" placeholder='LastName' name='lastName' onChange={inputChange} required />
                            <input type="email" placeholder='Email' name='email' onChange={inputChange} required />
                            <input type="password" placeholder='Password' name='password' onChange={inputChange} required />
                            <Link to={'/login'} >
                                <p>Already have an account?</p>
                            </Link>
                            <button className='btn #673ab7 deep-purple waves-effect waves-light' type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Register