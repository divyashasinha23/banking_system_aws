
import React, {Component} from 'react';
import axios from 'axios';

class dummyUser extends Component {
    state={
          posts:[]
      
    };
     
    async componentDidMount() {
        const response = await axios.get('http://localhost:5000/app/user-dummy');
        console.log(response);
        // this.setState({posts});
        // console.log(posts);
    }
    
   

    render() {

        return(
            <>
         <table class="table">
  <thead>
    <tr>

      <th scope="col">Full Name</th>
      <th scope="col">Account Number</th>
      <th scope="col">Total balance</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
  </tbody>
</table>
              
            </>
            );
}
}

export default dummyUser