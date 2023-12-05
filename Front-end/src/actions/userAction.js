import axios from 'axios'
import Swal from 'sweetalert2'
import { startGetCart } from './cartActions'  

export const startRegisterUser = (formData, redirect) => {
    return (dispatch) => {
        axios.post('/api/userAuth/register',formData)
            .then((res)=>{
                const result =res.data
                if(result.hasOwnProperty('errors')){
                    alert(result.message)
                }else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Your new User Account has been Created',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    redirect()
                }
            })
            .catch((err)=>{
                alert(err.message)
            })
    }
}

export const startUserLogin = (loginData,redirect)=>{
    return(dispatch)=>{
        axios.post('/api/userAuth/login',loginData)
              .then((res)=>{
                  const result = res.data
                  console.log('adminLoginAction',result)
                  if(result.hasOwnProperty('errors')){
                      alert(result.errors)
                  } else {
                      localStorage.setItem("token", result.accessToken)
                      localStorage.setItem("role",result.isAdmin)
                      dispatch(userLoggedIn())
                      dispatch(startGetUserAccountDetails(result._id))
                      dispatch(startGetCart())
                      Swal.fire({
                        icon: 'success',
                        title: 'SucessFully Logged In',
                        showConfirmButton: false,
                        timer: 2000
                    })
                      redirect()
                  }
              })
              .catch((err)=>{
                  alert(err.message)
              })
    }
}

export const userLoggedIn = () => {
    return {
        type : 'USER_LOGGEDIN'
    }
}

export const startGetUserAccountDetails = (id) => {
    return (dispatch) => {
        axios.get(`/api/users/${id}`,{
            headers : {
                'Token' : `Bearers ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                console.log(response.data)
                dispatch(userLoginInfo(response.data))
            })
            .catch((error) => {
                Swal.fire(error.message)
            })
    }
}

export const userLoginInfo = (result)=>{
    return{
        type:"USERLOGIN",
        payload: result
    }
}

export const startEditUserAccount = (id, formData, handleClose) => {
    return (dispatch) => {
        axios.put(`/api/users/${id}`, formData, {
            headers: {
                "Token" : `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((response) => {
                dispatch(userEditedAccount(response.data))
                handleClose()
            })
            .catch((error) => {
                Swal.fire(error.message)
            })
    }
}

export const userEditedAccount = (data) => {
    return {
        type : 'USER_EDITED_ACCOUNT',
        payload : data
    }
}