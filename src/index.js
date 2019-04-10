import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {Provider} from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import store from './store';
import './firebase/firebase';
import ScrollToTop from './utils/ScrollToTop';
import { BrowserRouter} from 'react-router-dom';


ReactDOM.render(<Provider store={store}><BrowserRouter><ScrollToTop><App /></ScrollToTop></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
