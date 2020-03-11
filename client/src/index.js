import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './styles.css';
import { Provider } from 'react-redux';
import reducer from './reducers';
import Header from './components/Header';

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <div className="body">
        <Header></Header>
    </div>
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
