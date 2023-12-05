import React,{useState} from "react";
import Heading from "../reusables/Heading"
import { useDispatch } from "react-redux";
import { startsupplierLogin } from "../../actions/actionGenerator";
import validator from "validator";
import Button from '../reusables/Button' 

const SupplierLogin=(props)=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [errors,setErrors]=useState({})
    const error={}

    const dispatch = useDispatch()

    const handleChange=(e)=>{
        const input=e.target.value 
        const selectInput=e.target.name 
        if(selectInput==='email')
        {
            setEmail(input)
        }
        if(selectInput==='password')
        {
            setPassword(input)
        }
    }

    const runCallback=()=>{
        if(email==='')
        {
            error.name='please enter the Email!'
        }
        if( !validator.isEmail(email.trim()) ){
            error.email = 'Invalid Email'
        }
        if(password==='')
        {
            error.password='please enter the password!'
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        runCallback()
        if(Object.keys(error).length>0)
        {
            setErrors(error)
        }
        else{
            const formData={
                username : email,
                password
            }
            console.log(formData)
            const redirect = () => {
                props.history.push('/')
            }
            dispatch(startsupplierLogin(formData,redirect))
        }
    }

    return(
        <div className="container mt-5">
            <Heading
                className="mb-4"
                type="h3"
                title="Login here"
            />

            <form onSubmit={handleSubmit}>
                <div className='row mb-4'>
                    <div className='col-md-6'>
                        <input className="form-control" type='text' name='email' value={email} placeholder="Enter your email" onChange={handleChange} />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                </div>   
                <div className='row mb-4'>
                    <div className='col-md-6'>
                        <input className="form-control" type='password' name='password'value={password} placeholder="Enter your password" onChange={handleChange} />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                </div> 
                
                <input className="btn btn-primary" type='submit' value='Login' />

                <Button
                    className="btn btn-outline-secondary mx-4"
                    type="button"
                    value="Cancel"
                    handleClick={() => {
                        props.history.push('/')
                    }}
                />
            </form>
        </div>
    )
}
export default SupplierLogin