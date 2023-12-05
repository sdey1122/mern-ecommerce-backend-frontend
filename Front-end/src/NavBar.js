import React, { useEffect } from 'react'
import { Link, Route, withRouter, Switch } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import Home from './components/Home'
import Products from './components/products-module/Products'
import Cart from './components/cart-module/Cart'
import AddProduct from './components/products-module/AddProduct'
import NotFound from './components/NotFound'
import Heading from './components/reusables/Heading'
import UserRegister from './components/user-module/UserRegister'
import UserLogin from './components/user-module/UserLogin'
import Payment from './components/order-module/Payment'
import SupplierLogin from './components/supplier-module/SupplierLogin'
import SupplierRegister from './components/supplier-module/SupplierRegister'
import { startGetUserAccountDetails, userLoggedIn } from './actions/userAction'
import { startGetSupplierAccountDetails, supplierLoginedIn } from './actions/actionGenerator'
import jwtDecode from 'jwt-decode'
import Account from './components/reusables/Account'
import { setCart, startGetCart } from './actions/cartActions'
import Swal from 'sweetalert2'

const Navbar = (props) => {
    const { history } = props
    const dispatch = useDispatch()

    const data = useSelector((state) => {
        return [ state.customer.isLogin, state.supplierLogin.supplierLogin, state.cart.data, state.customer.data._id ]
    })

    const [ isLogin, supplierLogin, cartData, userId ] = data
    console.log('islogin',isLogin, supplierLogin, cartData)

    const result = cartData.filter((item) => {
        return item.userId._id === userId
    })

    useEffect(() => {
        const role = localStorage.getItem("role")
        const token = localStorage.getItem('token')
        if( role ===  "true" ){
            dispatch(supplierLoginedIn())
            dispatch(startGetSupplierAccountDetails(jwtDecode(token).id))
        }else if( role === "false" ){
            dispatch(userLoggedIn())
            dispatch(startGetUserAccountDetails(jwtDecode(token).id))
            dispatch(startGetCart())
        }
    },[])

    const handleLogOut = () => {
        Swal.fire({
            title: 'Are you sure?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
          }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token")
            localStorage.removeItem("role")
            if( supplierLogin ){
                dispatch(supplierLoginedIn())
            }else{
                dispatch(setCart([]))
                dispatch(userLoggedIn())
            }
            history.push('/')
              Swal.fire('Successfully logged out!', '', 'success')
            } 
            else if (result.isDenied) {
              Swal.fire('Not logged out', '', 'info')
            }
          })
    }

    return(
        <div>
            <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                <div className='container'>
                    <Heading
                        className="navbar-brand"
                        type="h1"
                        title="E-store 🏬"
                    />
                    <button
                        type="button"
                        className="navbar-toggler"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarMenu"
                    >
                    <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='collapse navbar-collapse' id='navbarMenu'>
                        <ul className='navbar-nav ms-auto'>
                            <li className='nav-item'>
                                <Link className="nav-link" to="/"> Home </Link>
                            </li>
                            <li className='nav-item'>
                                <Link className="nav-link" to="/products"> Products </Link>
                            </li>

                            { (isLogin || supplierLogin) && (
                                <>
                                    { !supplierLogin && (
                                        <li className='nav-item'>
                                            <Link className="nav-link" to="/cart"> {`Cart- ${result.length}`} </Link> 
                                        </li>
                                    ) }
                                </>
                            ) }
                            
                            { isLogin || supplierLogin ? (
                                <>
                                    
                                    <li className="nav-item dropdown">
                                        <Link 
                                            className="nav-link dropdown-toggle" 
                                            role="button" 
                                            data-bs-toggle="dropdown" 
                                            to="/user"
                                        > { isLogin ? "User" : "Supplier" } </Link>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link className="dropdown-item" to="/account"> Account </Link>
                                                <Link className="dropdown-item" to="#" onClick={handleLogOut}> Log-out </Link>
                                            </li> 
                                        </ul>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item dropdown">
                                        <Link 
                                            className="nav-link dropdown-toggle" 
                                            role="button" 
                                            data-bs-toggle="dropdown" 
                                            to="/user"
                                        > User </Link>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item" to="/user/register"> Register </Link>
                                            <Link className="dropdown-item" to="/user/login"> Login </Link>
                                        </li> 
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link 
                                        className="nav-link dropdown-toggle" 
                                        role="button" 
                                        data-bs-toggle="dropdown" 
                                        to="/user"
                                    > Supplier </Link>
                                    <ul className="dropdown-menu">    
                                        <li>
                                            <Link className="dropdown-item" to="/supplier/register"> Register </Link>
                                            <Link className="dropdown-item" to="/supplier/login"> Login </Link>
                                        </li> 
                                    </ul>
                                </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            <Switch>
                <Route path="/" component={Home} exact/>
                <Route path="/products" component={Products}/>
                <Route path="/supplier/products/add" component={AddProduct}/>
                <Route path="/account" component={Account} />
                <Route path="/cart" component={Cart}/>
                <Route path="/user/register" component={UserRegister}/>
                <Route path="/user/login" component={UserLogin}/>
                <Route path='/user/payment' component={Payment} exact />
                <Route path='/supplier/login' component={SupplierLogin} exact={true}></Route>
                <Route path='/supplier/register' component={SupplierRegister} exact></Route>
                <Route path="*" component={NotFound}/>
            </Switch>
        </div>
    )
}

export default withRouter(Navbar)