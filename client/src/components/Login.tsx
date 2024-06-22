import { useMutation } from '@apollo/client';
import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_USER } from './gqloperation/mutations';


const Login: FC = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER,{
        refetchQueries:[
            'getMyProfile',
            'QuotesWithName',
            'getUserById'
        ],
        onCompleted(data){
            localStorage.setItem("token",data.user.token)
            navigate("/")
        }
    })
    if (loading) return <h5>Loading....</h5>
    // if(data){
    //     localStorage.setItem('token',data.user.token);
    //     navigate("/")
    // }
    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(formData)
        loginUser({
            variables:{
                userSignin:formData
            }
        })

    }
    return (
        <>
            <div className="container my-container">
                {
                    error && <div className='red card-panel'>{error.message}</div>
                }
                <div className="card card-panel hoverable ">
                    <div className="cart-content">
                        <span className="card-title">Login</span>
                        <form action="" onSubmit={handleSubmit}>
                            <input type="email" placeholder='Email' name='email' onChange={inputChange} required />
                            <input type="password" placeholder='Password' name='password' onChange={inputChange} required />
                            <Link to={'/signup'} >
                                <p>Don't have an account?</p>
                            </Link>
                            <button className='btn #673ab7 deep-purple waves-effect waves-light' type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login