import React, {Component} from 'react';
import * as ACTIONS from '../store/actions/actions';
import Auth from '../utils/auth';
import {connect} from 'react-redux';

const auth = new Auth();
class Container1 extends Component {
  
    render() { 
        const user_text = 'Text 1';
        return ( <div>
    <button onClick={()=>auth.login()}>Login</button>
    <button onClick={()=>console.log(this.props.stateprop1)}>Get State</button>
    <button onClick={()=>console.log(this.props.action1())}> Dispatch Action 1</button>  
    <button onClick={()=>console.log(this.props.action2())}> Dispatch Action 2</button>  
    <button onClick={()=>this.props.action_creator1()}> Dispatch Action Creator 2</button>  
    <button onClick={()=>this.props.action_creator2()}> Dispatch Action Creator 2</button>  
    <button onClick={()=>this.props.action_creator3(user_text)}> Dispatch Action Creator 3</button>  
    {this.props.stateprop1 ? <h1>{this.props.user_input}</h1> : null}
        </div> );
    }
}
function mapStateToProps(state){
return {
   stateprop1: state.reducer1.stateprop1,
   user_input:state.user_reducer.user_text
 //  stateprop1: state.user_text
}
}
function mapDispatchToProps(dispatch){
    return{
        // Cach 1
        action1: ()=>dispatch(ACTIONS.SUCCESS),
        action2: ()=>dispatch(ACTIONS.FAILURE),
        // Cach 2
        action_creator1: () => dispatch(ACTIONS.success()),
        action_creator2: () => dispatch(ACTIONS.failure()),
        action_creator3: (text) => dispatch(ACTIONS.user_input(text))
    }
}
 
export default connect(mapStateToProps,mapDispatchToProps)(Container1);