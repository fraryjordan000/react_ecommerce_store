import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Details from './components/Details';
import Cart from './components/Cart';

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
        <Route exact path="/details" component={Details}/>
        <Route exact path="/cart" component={Cart}/>
        </div>
      </Router>
    );
  }
}

export default App;
