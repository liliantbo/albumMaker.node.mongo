import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './reducers/store';


import FlowAndSelectedOptionContext from './reducers/FlowAndSelectedOptionContext';

import Landing from './Landing';

function App() {

  return (
    <Provider store={store}>
      <FlowAndSelectedOptionContext>

        <Landing />

      </FlowAndSelectedOptionContext>
    </Provider>
  );
}

export default App;
