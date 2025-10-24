import 'bootstrap/dist/css/bootstrap.css';
import 'core-js/features/array';
import 'core-js/features/object/values';
import 'core-js/features/string/includes';
import React from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import 'sw-rpg-icons/css/sw-rpg-colors.min.css';
import 'sw-rpg-icons/css/sw-rpg-icons.min.css';
import { App } from './app/app';
import allReducers from './redux/reducers';
// TODO: Convert to styled-components GlobalStyle
// import './styles/index.scss';

export const store = createStore(allReducers, {}, applyMiddleware(thunk));

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);
