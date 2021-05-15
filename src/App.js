import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

function App() {
  return <div className="App">Hello</div>;
}

serviceWorkerRegistration.register();
export default App;
