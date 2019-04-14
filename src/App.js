import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Home from './containers/Home';
import Details from './containers/Details';
import Cart from './containers/Cart';
import Orders from './containers/Orders';

class App extends Component {
  
  componentDidMount() {
    
  }

  render() {
    return (
      <Router>
        <div className="App">
        <Navbar />
        <Route exact path="/" component={() => <Home/>}/>
        <Route exact path="/home" component={() => <Home/>}/>
        <Route exact path="/details" component={() => <Details/>}/>
        <Route exact path="/cart" component={() => <Cart/>}/>
        <Route exact path="/orders" component={() => <Orders/>}/>
        </div>
      </Router>
    );
  }
}

export default App;
