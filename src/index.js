import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
//Import Saga Middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

//Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield takeEvery('FETCH_SEARCH', fetchSearch);
}

function* fetchSearch(action) {
  try {
    let searchTerm = action.payload;
    let response = yield axios.get(`/movie/${searchTerm}`);
    console.log('saga search response', response.data);
    yield put({
      type: 'SET_SEARCH',
      payload: response.data
    });
  } catch (error) {
    console.log('error in client side search get', error);
  }
}

const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return action.payload;
    case 'CLEAR_SEARCH':
      return (state = []);
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies
  }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
