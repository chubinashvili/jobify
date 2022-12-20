import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import 'normalize.css'
import './index.css'
import store from './store/store'
// import { AppProvider } from './context/appContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <AppProvider> */}
        <App />
      {/* </AppProvider> */}
    </Provider>
  </React.StrictMode>
);

