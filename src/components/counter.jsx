import React,{ Component} from "react";
export default class Counter extends Component {
    state = {  
        count:0, // Comment if you want to run class Counter
     //    count: this.props.counter.value // Open if you want to run class Counter
    };
  handleIncrement = () =>{
    this.setState({count: this.state.count + 1});
  }
  handleDecrement = () =>{
    this.setState({count: this.state.count - 1});
  }

    render() { 
        return ( 
        <div>
        {/* <h5 className={this.getBadgeClasses()}>Counter: {this.props.counter.id}</h5>  // Open if you want to run class Counter */}
        <button onClick={this.handleIncrement} className="btn btn-success btn-sm">Increment</button>
        <span  className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button onClick={this.handleDecrement} className="btn btn-danger btn-sm">Decrement</button>
       {/* <button onClick={() =>this.props.onDelete(this.props.counter.id)} className="btn btn-dark btn-sm m-2">Delete</button>  Open if you want to run class Counter */}
        </div> );
    }
    getBadgeClasses() {
        let classes = "badge m-2 badge-";
       if(this.state.count > 0){
        classes += "success";
       }else if(this.state.count < 0){
        classes += "danger";
       }else{
        classes += "warning";
       }
        return classes;
    }

    formatCount(){
        const {count} = this.state;
        return count === 0 ? "Zero" : count;
    }
}
 
// export default Counter;