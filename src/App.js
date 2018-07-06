import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './store/configureStore';

import MainPageComponent from "./containers/MainPageContainer";

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <div className="App">
            <MainPageComponent />
          </div>
        </Provider>
    );
  }
}

export default App;
