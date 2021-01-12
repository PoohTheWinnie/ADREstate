import React, { Component } from "react";
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store';

import { loadUser } from "./actions/authActions";
import ProductRegistration from "./pages/productRegistration";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Profile from "./pages/Profile";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component{
  // componentDidMount(){
  //   store.dispatch(loadUser());
  // }
  render(){
    return(
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
                <Home/>
            </Route>
            <Route exact path="/Map">
                <Map/>
            </Route>
            <Route exact path="/Profile/:id">
                <Profile/>
            </Route>
            <Route exact path="/Product">
              <ProductRegistration/>
            </Route>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}


export default App;