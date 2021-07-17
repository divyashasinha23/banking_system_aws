import React from 'react';
import { Component } from 'react';
import { getToken } from './Common';
import { Redirect, Route } from 'react-router-dom';


// const PrivateRoute =({ component: Component, ...rest}) => {
//     return(
//         <Route
//         {...rest}
//         render={props => {
//             return getToken() ? <Component {...props} />
//             :<Redirect to ={{pathname: '/sign-in'} } />
//         }}
//         />
//     )
// }

const PrivateRoute = ({ component: Component, ...rest}) => {
    const token = getToken();
    if(!token){
        return <Redirect to='/sign-in' />

    }

    return <Route {...rest} render={props => <Component {...props} />} />
}

export default PrivateRoute;