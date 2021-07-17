import React, {useState} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { getToken, setUserSession } from '../Utils/Common';



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
	cursor: pointer;
	width: 100%;
  }

  error{
	  color: red;
	  margin-bottom: 1px;
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

const SigninAdmmin = styled.div`
 color: #000;
 text-align:center;
 
 h2{
	 color: black;
	 margin-top: 5px;
	 font-size: 15px;
	 text-decoration: none;
 }
`

 function AddNewUSer() {

	let history = useHistory();
    
	const[email, setEmail] = useState('');
	const[FullName, setFullName] = useState('');
	const[loading, setLoading] = useState(false);

	const handleNew = async() => {

		const token = getToken();
    console.log(token);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
        
    };
	 const bodyParameters = {
        email:email,
		FullName: FullName
	 }

		setLoading(true);

		await axios.post("http://localhost:5000/app/add-new-user" ,
			bodyParameters,
			config
		).then(response => {
			setLoading(false);
           console.log('response >>>', response);
		   alert("New User Added")
		   alert("Password "+ response.data.NewPassword);
		}).catch(error => {
		 setLoading(false)
         console.log('error >>>', error);
		});
		
		
	}

	return(
        <>
		<Head_Container>
		<Container>
			<Header>
				<h2>Add New Customer</h2>
			</Header>
			<Form_Main>
				<Form_Control>
					<label htmlFor="Name">Full Name</label> 
					<input 
					value= {FullName}
					onChange= {e => setFullName(e.target.value)}
					name="FullName" 
					type="FullName"
					id="FullName" />
				</Form_Control>
				<Form_Control>
					<label htmlFor="Email">Email</label> 
					<input
					value= {email}
					onChange= {e => setEmail(e.target.value)}
					name="email"
					 type="email" 
					 id="email" />
				</Form_Control>
				<button 
				onClick ={handleNew} 
				value={loading ? "loading..." :"Login"}
				disabled={loading}
				type="submit">Submit</button>
			</Form_Main>
		</Container>
		</Head_Container>
        </>

    );
 }


export default AddNewUSer;
