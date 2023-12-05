import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EditAccount from './EditAccount'

const Account = (props) => {
    const [ account, setAccount ] = useState({})

    const accountData = useSelector((state) => {
        return [ state.supplierLogin.data, state.customer.data ]
    })

    const [ supplierAccountData, customerAccountData ] = accountData
    console.log(accountData)

    useEffect(() => {
        if( supplierAccountData.isAdmin === true ){
            setAccount(supplierAccountData)
        }else if( customerAccountData.isAdmin === false ){
            setAccount(customerAccountData)
        }
    },[supplierAccountData, customerAccountData])

    return (
        <div className='container my-5'>
            <h2>Account Details:</h2>
            <h3>Name: {account.name}</h3>
            <h3>Email- {account.username}</h3>
            <h4>Account Created on: {new Date(account.createdAt).toDateString()}</h4>
            <EditAccount {...account}/>
        </div>
    )
}

export default Account