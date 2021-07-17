import React, {useState} from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { setUserSession } from '../Utils/Common';


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

function AdminLogin() {

	let history = useHistory();
    
	const[Username, setUsername] = useState('');
	const[password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const[loading, setLoading] = useState(false);

	const handleLogin = () => {

		setError(null);
		setLoading(true);

		axios.post("http://localhost:5000/app/admin-login", {
			Username:Username,
			password: password
		}).then(response => {
			setLoading(false);
			setUserSession(response.data.token, response.data.admin)
           console.log('response ', response);
			history.push('/bank-details');

		}).catch(error => {
		 setLoading(false)
		 if(error.response.status === 401 || error.response.status === 400){
		 setError(error.response.data.message);
		}
		else{
			setError("Something went wrong");
		}
         console.log('error ', error);
		});
		

	}

	return(
        <>
		<Head_Container>
		<Container>
			<Header>
				<h2>Admin Login</h2>
			</Header>
			<Form_Main>
				<Form_Control>
					<label htmlFor="Username">Username</label> 
					<input 
					value= {Username}
					onChange= {e => setUsername(e.target.value)}
					name="Username" 
					type="Username"
					id="Username" />
				</Form_Control>
				<Form_Control>
					<label htmlFor="Password">Password</label> 
					<input
					value= {password}
					onChange= {e => setPassword(e.target.value)}
					name="password"
					 type="password" 
					 id="password" />
				</Form_Control>
				{error && <p className="error">{error}</p>}
				<button 
				onClick ={handleLogin} 
				value={loading ? "loading..." :"Login"}
				disabled={loading}
				type="submit">Submit</button>
			</Form_Main>
		</Container>
		</Head_Container>
        </>

    );
 }


export default AdminLogin;