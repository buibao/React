import React, {Component} from 'react';
import * as ACTIONS from '../store/actions/actions';
import {connect} from 'react-redux';

class CounterRedux extends Component {
    render() { 
        return (  
            <div className="counter">
            <h2>CounterRedux</h2>
            <div>
               
                 <button className="btn btn-danger btn-sm" onClick={()=>this.props.action2()}>DECREMENT</button>
               <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
               <button className="btn btn-success btn-sm" onClick={()=>this.props.action1()}>INCREMENT</button>
                </div>
            </div>
        );
    }
    
    formatCount(){
        const count = this.props.count;
        return count === 0 ? "Zero" : count;
    }
    getBadgeClasses() {
        let classes = "badge m-2 badge-";
       if(this.props.count > 0){
        classes += "success";
       }else if(this.props.count < 0){
        classes += "danger";
       }else{
        classes += "warning";
       }
        return classes;
    }
}
const mapStateToProps = state =>({
    count: state.counter.count,
});
function mapDispatchToProps(dispatch){
        return{
            action1: ()=>dispatch(ACTIONS.INCREMENT),
            action2: ()=>dispatch(ACTIONS.DECREMENT),
        }
    }
     
export default connect(mapStateToProps,mapDispatchToProps)(CounterRedux);