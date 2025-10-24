import 'bootstrap/dist/css/bootstrap.css';
import 'core-js/features/array';
import 'core-js/features/object/values';
import 'core-js/features/string/includes';
import React from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'sw-rpg-icons/css/sw-rpg-colors.min.css';
import 'sw-rpg-icons/css/sw-rpg-icons.min.css';
import { App } from './app/app';
// TODO: Convert to styled-components GlobalStyle
// import './styles/index.scss';

// Export store from centralized location
export { store } from './redux/store';

// Only render if we have a root element (legacy standalone mode)
// In Next.js, this code won't execute because there's no #root element
if (typeof document !== 'undefined') {
    const container = document.getElementById('root');
    if (container) {
        const root = createRoot(container);
        root.render(
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        );
    }
}
