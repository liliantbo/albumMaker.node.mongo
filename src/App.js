import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import FlowAndSelectedOptionContext from './Controllers/FlowAndSelectedOptionContext';

import Landing from './Landing';

function App() {

  return (
    <FlowAndSelectedOptionContext>
      <Landing/>
    </FlowAndSelectedOptionContext>
  );
}

export default App;
