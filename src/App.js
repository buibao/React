import React, { Component } from 'react';
import './App.css';
import Counter from "./components/counter";
import Counters from "./components/counters";
import Container1 from './containers/container1';
import CounterRedux from './containers/CounterRedux';
import CounterRedux2 from './containers/CounterRedux2';
import TableSagaRedux from './containers/TableSagaRedux';
import Table from "./components/table";
import NotFound from "./components/NotFound";
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';
function ChildComponent({ match }) {
  return (
    <div className='m-5'>
      <h3>Day la {match.params.childId.replace(/-/g, ' ').toUpperCase()}</h3>
    </div>
  );
}
function ChildRoute({ match }) {
  return (
    
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to={`${match.url}/child-route-1`}>Child route 1</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`${match.url}/child-route-2`}>Child route 2</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`${match.url}/child-route-3`}>Child route 3</Link>
          </li>
        </ul>
      </nav>
      <Route path={`${match.path}/:childId`} component={ChildComponent} />
      <Route
        exact
        path={match.path}
         render={() => <Counters/>}
      />
    </div>
  );
}
class App extends Component {
  render() {
    var isAdmin = true;
    return (
      <Router>
      <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul className="navbar-nav">
        <li className="nav-item">
    <NavLink className="nav-link" to="/">Counter |</NavLink>
           </li>
           <li className="nav-item">
    <NavLink className="nav-link" to="/Counter2">Counter2 |</NavLink>
    </li>
           <li className="nav-item">
    <NavLink className="nav-link" to="/Nested">Nested |</NavLink>
           </li>
   
    <li className="nav-item">
    <NavLink className="nav-link" to="/Table">Table |</NavLink>
    </li>
    <li className="nav-item">
    <NavLink className="nav-link" to="/ReduxDemo">ReduxTutorial |</NavLink>
    </li>
    <li className="nav-item">
    <NavLink className="nav-link" to="/CounterRedux">CounterRedux |</NavLink>
    </li>
    <li className="nav-item">
    <NavLink className="nav-link" to="/CounterRedux1">CounterRedux1 |</NavLink>
    </li>
    <li className="nav-item">
    <NavLink className="nav-link" to="/CounterRedux2">CounterRedux2</NavLink>
    </li>
    <li className="nav-item">
    <NavLink className="nav-link" to="/TableSagaRedux">TableSagaRedux</NavLink>
    </li>
  </ul>
</nav>
    </>
    <Switch>
    {/* <Route path="/" exact  render={()=>{return (<button onClick={()=>auth.login()}>Login</button>)}}/> */}
    <Route path="/" exact component={Counter} />
    <Route path="/Nested" component={ChildRoute} />
    <Route path="/Counter"   render={()=>{return (<Counter/>)}}/>
    <Route path="/ReduxDemo"   render={()=>{return (<Container1/>)}}/>
    <Route path="/Counter2"   render={()=>{return (<Counters/>)}}/>
    <Route path="/Table" render={() => (isAdmin ? <Table /> : (<Redirect to="/" />))} />
    <Route path="/CounterRedux"   render={()=>{return (<CounterRedux/>)}}/>
    <Route path="/CounterRedux1"   render={()=>{return (<CounterRedux/>)}}/>
    <Route path="/CounterRedux2"   render={()=>{return (<CounterRedux2/>)}}/>
    <Route path="/TableSagaRedux"   render={()=>{return (<TableSagaRedux/>)}}/>
    <Route component={NotFound} />
    </Switch>
    </Router>
    );
  }
}

export default App;