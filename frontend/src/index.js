import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV !== "development")
    console.log = () => {};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
