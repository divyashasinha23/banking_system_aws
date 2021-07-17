import React, {useState} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { getToken } from "../Utils/Common";

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

function Credit() {

	
	// const token = sessionStorage.getItem("token") || null;
	// const token = getToken();
    // console.log(token);
    // const config = {
    //     headers: { 
	// 		'Content-Type' : 'application/json',
	// 	    'Accept' : 'application/json',
	// 		Authorization: `Bearer ${token}` }
        
    // };
    
	const[AmountCredit, setAcc] = useState('');
	const[AccountNumber, setAmount] = useState('');
	const[loading, setLoading] = useState(false);

	const handleTransfer = async () => {

		setLoading(true);

		const token = getToken();
		console.log(token);
		const config = {
			headers: { 
				'Content-Type' : 'application/json',
				'Accept' : 'application/json',
				Authorization: `Bearer ${token}` }
			
		};
		
		const bodyParameters = {
			AmountCredit: Number(AmountCredit),
			AccountNumber: AccountNumber,
		}
		await axios.post("http://localhost:5000/app/Credit", 
		bodyParameters,
		config,
	
			
	).then(response => {
			setLoading(false);
		
           console.log('response >>>', response);
		}).catch(error => {
		 setLoading(false)
         console.log('error >>>', error);
		});
		// history.push('/user-details');
        alert("Amount Credited Successfully")
	}


    return(
        <>
         		<Head_Container>
		<Container>
			<Header>
				<h2>Transfer Amount</h2>
			</Header>
			<Form_Main>
				
				<Form_Control>
					<label htmlFor="AccountNumber">Account Number</label> 
					<input
					value= {AccountNumber}
					onChange= {e => setAmount(e.target.value)}
					name="AccountNumber"
					 type="text" 
					 id="AccountNumber" />
				</Form_Control>
				<Form_Control>
					<label htmlFor="AmountDebit">Credit Amount</label> 
					<input 
					value= {AmountCredit}
					onChange= {e => setAcc(e.target.value)}
					name="AmmountCredit" 
					type="text"
					id="AmountCredit" />
				</Form_Control>
				<button 
				onClick ={handleTransfer} 
				value={loading ? "loading..." :"Login"}
				disabled={loading}
				type="submit">Submit</button>
			</Form_Main>
		</Container>
		</Head_Container>
        </>

    );
	
}

export default Credit;