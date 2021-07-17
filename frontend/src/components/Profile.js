import React, {useState} from 'react'
import styled from 'styled-components';
import Amplify, {API} from 'aws-amplify';
import { useEffect } from 'react';
import UserProfile from './UserProfile';

const Head_Container = styled.div`
background-color: #ffffff;
font-family: 'Open Sans', sans-serif;
display: flex;
align-items: center;
justify-content: center;
min-height: 100vh;
margin: 0;
`

const Container = styled.div`
    background-color: #fff;
	border-radius: 5px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
	overflow: hidden;
	width: 400px;
	max-width: 100%;
h2{
	margin: 0;
}
	
`
const Header = styled.div`
border-bottom: 1px solid #f0f0f0;
padding: 10px 30px;
`
const Form_Main = styled.div`
padding: 20px 30px;

  button {
	background-color: #113ed3;
	border: 2px solid #4734f5;
	border-radius: 4px;
	color: #fff;
	display: block;
	font-family: inherit;
	font-size: 16px;
	padding: 10px;
	margin-top: 20px;
	width: 100%;
  }

  error{
	  color:#ff0f0f
  }
`

const Form_Control = styled.div`
margin-bottom: 10px;
	padding-bottom: 20px;
	position: relative;


	label {
		display: inline-block;
		margin-bottom: 5px;
	}

	input {
		border: 2px solid #f0f0f0;
	border-radius: 4px;
	display: block;
	font-family: inherit;
	font-size: 14px;
	padding: 10px;
	width: 100%;
	}

	input:focus{
		outline: 0;
	border-color: #777;
	}
`

function Profile() {

	const [FullName, setFullName] = useState('');
	const [AccountNumber, setAccountNumber] = useState('');
	const [TotalBalance, setTotalBalance] = useState('');
	const [users, setusers] = useState([]);

	useEffect(() => {
		API.get('userprofileapi', '/userprofile/accountnumber')
		.then(userdetailsResp => {
		  setusers([...users, ...userdetailsResp]);
		}); 
	  },[]);

	const handleSubmit = e => {
		e.preventDefault();
	 
		API.post('userprofileapi','/userprofile', {
		  body:{
			fullname: FullName,
			accountnumber: Number(AccountNumber),
			totalbalance: Number(TotalBalance)
		  }
		}).then(() => {
		  setusers([...users, {}])
		})
		
	}



    return(
		
	
        <>
        <Head_Container>
		<Container>
			<Header>
				<h2>Update Profile</h2>
			</Header>
			<Form_Main>
				
				<Form_Control>
					<label htmlFor="FullName">Full Name</label> 
					<input
					value= {FullName}
					onChange= {e => setFullName(e.target.value)}
				     />
				</Form_Control>
				<Form_Control>
					<label htmlFor="AccountNumber">Account Number</label> 
					<input 
					value= {AccountNumber}
					onChange= {e => setAccountNumber(e.target.value)}
			        />
				</Form_Control>
				<Form_Control>
					<label htmlFor="TotalBalance">Total Balance</label> 
					<input 
					value= {TotalBalance}
					onChange= {e => setTotalBalance(e.target.value)}
			        />
				</Form_Control>
				<button 
				onClick ={handleSubmit} 
				type="submit">Add Details</button>
			</Form_Main>
		</Container>
		<UserProfile 
		fullname = {FullName}
		accountnumber = {AccountNumber}
		totalbalance = {TotalBalance} 
		/>
		</Head_Container>
		<UserProfile 
		fullname = {FullName}
		accountnumber = {AccountNumber}
		totalbalance = {TotalBalance} 
		/>
	

        </>

    );
	
}

export default Profile;