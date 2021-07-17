
import React, {Component} from 'react';
import axios from 'axios';
import { getUser } from '../Utils/Common';

class Transaction extends Component {
    state={
          posts:[],
          loading: true,
      
    };

    getPost = async () =>{
      const token = sessionStorage.getItem("token") || null;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
        
    };
      const res = await axios.get(`http://localhost:5000/app/transaction-details`,
      config
      )

      const posts = res.data.Detail;
      
      this.setState({ posts:posts, loading: false});
      console.log(posts);
    }
     
     componentDidMount() {
      this.setState({loading: true});
        
       this.getPost();

    

      // await axios.get(`http://localhost:5000/app/transaction-details`,
      // config
      // )
      // .then(res => {
      //   const posts = res.data;
      //   this.setState({ posts });
      //   console.log(posts);
      // });
    }

    renderTable = () => {
       var user =[];
      if(this.state.posts){
        user = this.state.posts.map(post => {
          return (
            <tr>
              <td>{post.AccountNumber}</td>
              <td>{post.AmountCredit}</td>
              <td>{post.AmountDebit}</td>
            </tr>
          )
        })
        return user;
      }
    }



    render() {

      console.log('lol',this.state.posts);
        return(
            <>
         <table class="table">
  <thead>
    <tr>

      <th scope="col">Account Number</th>
      <th scope="col">Credit</th>
      <th scope="col">Debit</th>
    </tr>
  </thead>
  <tbody>
    {/* {this.state.loading ?(
      <p>loading.......</p>
    )  : ( 
    this.state.posts.map(post => (
      <tr>
        <td>{post.AccountNumber}</td>
        <td>{post.AmountCredit}</td>
        <td>{post.AmountDebit}</td>
      </tr>
      ))
    )} */}
    {this.renderTable()}
  </tbody>
</table>
              
            </>
            );
}
}

export default Transaction