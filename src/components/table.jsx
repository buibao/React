import React, { Component } from 'react';
import axios from 'axios';
const API = 'https://jsonplaceholder.typicode.com/todos';
class Table extends Component {
   constructor(props){
super(props);
this.state ={
  value:'',
     users: [],
    isLoading: false,
    error:null,
};
   }
   handleChange =(event) =>{
    this.setState({value: event.target.value});
   }
   componentDidMount =()=> {
    this.setState({ isLoading: true });

    axios.get(API)
      .then(result => this.setState({
        users: result.data,
        isLoading: false
      }))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }


render() { 
    const {users, isLoading } = this.state;
    if(this.state.error){
      return <p>{this.state.error.message}</p>;
    }
    if(isLoading){
return <p>Loading...</p>;
    }
    let filterTitle = users.filter((data)=>{return data.title.indexOf(this.state.value) !== -1;});
    return (
      
      <>
      <span>Search title: </span>
    <input type="text" value= {this.state.value } onChange={this.handleChange}/>
        <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>UserID</th>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>
          {filterTitle.map((data) =>
           {
           
            const {userId,id,title,completed} = data;
             return (
             
                <tr key={title}>
                  <td>{userId}</td>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{completed === true ? "Hoàn thành" : "Chưa hoàn thành"}</td>
                </tr>            
                    
             );
           }
          )}
        </tbody>
            </table>    
        </>
     
      );
  }
}
   
 
export default Table;