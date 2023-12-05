import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { startSupplierAccountEdit, startSupplierRegister } from "../../actions/actionGenerator";
import Heading from "../reusables/Heading"
import validator from "validator";
import Button from '../reusables/Button' 

const SupplierRegister=(props)=>{
    const { _id, name: supplierName , username, isAdmin, history, handleClose } = props
    const [name,setName]=useState(supplierName ? supplierName : '')
    const [email,setEmail]=useState(username ? username : '')
    const [password,setPassword]=useState('')
    const [formErrors,setErrors]=useState({})
    const errors={}

    const dispatch = useDispatch()

    const handleChange=(e)=>{
        const input=e.target.name 
        const value=e.target.value 
        if(input==='name'){
            setName(value)
        }
        if(input==='email'){
            setEmail(value)
        }
        if(input==='password'){
            setPassword(value)
        }
    }

    const runCallback=()=>{
        if(name===''){
            errors.name='please enter the name'
        }
        if(email.trim().length === 0)
        {
            errors.email='please enter email!'
        }
        if( !validator.isEmail(email.trim()) ){
            errors.email = 'Invalid Email'
        }
        if(!_id){
            if(password==='')
            {
                errors.password='please enter password!'
            }
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        runCallback()
        if(Object.keys(errors).length>0){
            setErrors(errors)
        }
        else{
            setErrors({})
            const formData={
                name,
                username : email,
                password
            }
           console.log(formData)
            const redirect = () => {
                history.push('/supplier/login')
            }
            if(_id){
                const updatedData = {
                    name,
                    username : email,
                    isAdmin
                }
                console.log(updatedData)
                dispatch(startSupplierAccountEdit(_id,updatedData, handleClose))
            }else{
                dispatch(startSupplierRegister(formData,redirect))
            }
        }
        
    }

    return(
        <div className="container mt-5"> 
            { !_id  && (
                <Heading
                    className="mb-4"
                    type="h3"
                    title="Register here"
                />
            )}
            <form onSubmit={handleSubmit}>
                <div className='row mb-4'>
                    <div className='col-md-6'>
                        <input className="form-control" type='text' name='name' value={name} onChange={handleChange} placeholder="Enter your name"/>
                        {formErrors.name && <span className="text-danger">{formErrors.name}</span>}
                    </div>
                </div>   

                <div className='row mb-4'>
                    <div className='col-md-6'>
                        <input className="form-control" type='text' name='email'value={email} onChange={handleChange} placeholder="Enter your email"/>
                        {formErrors.email && <span className="text-danger">{formErrors.email}</span>}
                    </div>
                </div> 
                { !_id && (
                    <div className='row mb-4'>
                        <div className='col-md-6'>
                            <input className="form-control" type='password' name='password'value={password} onChange={handleChange} placeholder="Enter your password"/>
                            {formErrors.password && <span className="text-danger">{formErrors.password}</span>}
                        </div>
                    </div>      
                ) }
                
                <input className="btn btn-primary" type='submit' value={ _id ? "Save" : "Register" }/>

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
export default SupplierRegister 