import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import store, { loadData } from './store';
import Table from './Table';
import { HashRouter as Router, Route } from 'react-router-dom';


class _App extends Component{
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    // this.props.bootstrap();
  }

  //this works fine now need to figure out how to put my data into Material UI table and add search
  render(){
    return (
      <Router>
        <div>
          <Route component={ Table } path = '/' />
        </div>
        </Router>
    );
  }
}

// not sure if I need either of these maybe if I want length??
const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: ()=> {
      dispatch(loadData());
    }
  };
}

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

render(<Provider store = {store}><App /></Provider>, document.querySelector('#root'));
