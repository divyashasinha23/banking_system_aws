import React from 'react';
import { BrowserRouter as Router, withRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Navbar from './components/Navbar';
import Transfer from './components/Transfer';
import Footer from './components/pages/Footer/Footer';
import Home from './components/pages/HomePage/Home';
import Profile from './components/Profile';
import LoginForm from './components/LoginForm';
import User from './components/dummyUser';
import PublicRoute from './Utils/PublicRoute';
import PrivateRoute from './Utils/PrivateRoute';
import Transaction from './components/Transactions';
import AdminLogin from './components/AdminLogin';
import AdminNavbar from './components/AdminNavbar';
import BankDetails from './components/BankDetails';
import AllUser from './components/AllUser';
import dummyUser from './components/dummyUser';
import AddNewUSer from './components/AddNewUser';
import Credit from './components/Credit';
import Debit from './components/Debit';
import { Link } from 'react-router-dom'
import Amplify, {API} from 'aws-amplify';
import awsconfig from './aws-exports';
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react';
import { useEffect } from 'react';
import UserProfile from './components/UserProfile';



Amplify.configure(awsconfig);

function App() {
  return (
    <Router>
     <Switch>
       <Route path="/" exact>
         <Navbar />
         <Link to="/user-details">Update Profile</Link>
         <AmplifySignOut/>
         <Footer/>
       </Route>

       <Route path="/userProfile" exact>
       <Navbar/>
        <UserProfile />
         <Footer/>
       </Route>

       <Route path="/Admin" exact>
       <AdminNavbar/>
         <Home />
         <Footer/>
       </Route>

        <PublicRoute path='/sign-in' exact>
          <Navbar />
          <LoginForm />
          <Footer/>
        </PublicRoute>

         <PublicRoute path='/sign-in-admin' exact>
           <Navbar />
         <AdminLogin />
         <Footer/>
         </PublicRoute>

         <PublicRoute path='/dummy-user' exact>
           <Navbar />
         <dummyUser />
         </PublicRoute>

        <PrivateRoute path='/transfer' exact render = {props => {}}>
          <Navbar />
          <Transfer />
          <Footer />
        </PrivateRoute>   

         <Route path='/user-details' exact>
           <Navbar/>
           <Profile />
           <Footer />
         </Route>
      
        <PrivateRoute path='/user-transactions' exact>
          <Navbar />
          <Transaction />
        </PrivateRoute>

        <PrivateRoute path="/users" exact>
          <AdminNavbar/>
          <AllUser />
         
        </PrivateRoute>

        <PrivateRoute path="/bank-details" exact>
          <AdminNavbar/>
          <BankDetails />
          <Footer />
        </PrivateRoute>

        <PrivateRoute path="/admin-transfer-credit" exact>
          <AdminNavbar/>
          <Credit />
          <Footer />
        </PrivateRoute>

        <PrivateRoute path="/admin-transfer-debit" exact>
          <AdminNavbar/>
          <Debit />
          <Footer />
        </PrivateRoute>

        <PrivateRoute path="/add-new-customer" exact>
          <AdminNavbar/>
          <AddNewUSer />
          <Footer />
        </PrivateRoute>
    
     </Switch>
    
     </Router>
    
  );
}

export default withAuthenticator(App);
