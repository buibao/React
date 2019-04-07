import React, {Component} from 'react';
import * as ACTIONS from '../store/actions/actions';
import {connect} from 'react-redux';

class TableSagaRedux extends Component {
  state ={
    value: ''
  }
  handleChange =(event) =>{
    this.setState({value: event.target.value});
   }
   componentDidMount() {
    this.props.fectdata();
  }
    render () {
        if(!this.props.datas){
           return <p>Loading...!</p>
        }
        let filterTitle = this.props.datas.filter((data)=>{return data.title.indexOf(this.state.value) !== -1;});
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
          {filterTitle.map((data)=>
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
        )
      }
}
function mapStateToProps(state){
return {
  load: state.tabledata.loading,
  error: state.tabledata.error,
  datas: state.tabledata.data
}
}
function mapDispatchToProps(dispatch){
    return{
        fectdata: ()=>dispatch(ACTIONS.FETCHED_DATA),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TableSagaRedux);