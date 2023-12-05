import axios from 'axios'
import jwt_decode from 'jwt-decode'
import swal from 'sweetalert'
import Swal from 'sweetalert2'

export const startsupplierLogin = (formData,redirect) => {
    return (dispatch) => {
        axios.post('/api/suppAuth/login', formData)
            .then((response) => {
                const result = response.data
                const id = jwt_decode(result.accessToken)
                localStorage.setItem('token',result.accessToken)
                localStorage.setItem("role",result.isAdmin)
                dispatch(supplierLoginedIn())
                dispatch(startGetSupplierAccountDetails(id.id, id))
                Swal.fire({
                    icon: 'success',
                    title: 'SucessFully Logged In',
                    showConfirmButton: false,
                    timer: 2000
                })
                redirect()
            })
            .catch((err) => {
                Swal.fire(err.message)
            })
    }
}

export const supplierLoginedIn = () => {
    return {
        type : 'SUPPLIER_LOGIN' 
    }
}


export const startGetSupplierAccountDetails = (id) => {
    return (dispatch) => {
        axios.get(`/api/supplier/${id}`,{
            headers : {
                'Token' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            console.log(response.data)
            dispatch(supplierData(response.data))
        })
        .catch((error) => {
            Swal.fire(error.message)
        })
    }
}

export const supplierData = (data) => {
    return {
        type: 'SUPPLIER_DATA',
        payload: data
    }
}

export const startSupplierRegister = (formData,redirect) => {
    return (dispatch) => {
        axios.post('/api/suppAuth/register', formData)
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Your new Supplier Account has been Created',
                    showConfirmButton: false,
                    timer: 2000
                })
                redirect()
            })
            .catch((err) => {
                swal(err.message)
            })
    }
}

export const startSupplierAccountEdit = (id, formData, handleClose) => {
    return (dispatch) => {
        axios.put(`/api/supplier/${id}`, formData, {
            headers: {
                "Token" : `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                dispatch(supplierEditedAccount(response.data))
                handleClose()
            })
            .catch((error) => {
                Swal.fire(error.message)
            })
    }
}

export const supplierEditedAccount = (data) => {
    return {
        type : 'SUPPLIER_EDITED_ACCOUNT',
        payload : data
    }
}

export const stateAddAddress=(formData)=>{
    return (dispatch)=>{
        axios.post('/api/suppAddress/register',formData)
        .then((Response)=>{
            const data=Response.data 
            console.log('addres', data)
            if(data.hasOwnProperty('errors'))
            {
                dispatch(setAddAddressError(data.message))
            }
            else{
                dispatch(setAddAddressError(''))
                dispatch(setAddAddress(data))
            }
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}
export const setAddAddress=(data)=>{
    return{
        type:'ADDADDRESS',
        payload:data
    }
}
export const setAddAddressError=(error)=>{
    return {
        type:"ADDRESSERROR",
        payload:error
    }
}
export const stateAllAddresses=()=>{
    return(dispatch)=>{
        axios.get('/api/addresses')
        .then((Response)=>{
            const data=Response.data
            dispatch(setAllAddresses(data))
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}
export const setAllAddresses=(data)=>{
    return{
        type:'ALLADDRESSES',
        payload:data
    }
}
export const stateDeleteAddress=(id)=>{
    return (dispatch)=>{
        axios.delete(`/api/address/${id}`)
        .then((Response)=>{
            const data=Response.data 
            dispatch(setDeleteAddress(data))
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
}
const setDeleteAddress=(data)=>{
    return{
        type:'DELETEADDRESS',
        payload:data
    }
}

