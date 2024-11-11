import React from 'react';
import ReactDOM from 'react-dom/client';
import CartContextProvider from './store/cart-context.jsx';

import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CartContextProvider>
            <App />
        </CartContextProvider>
    </React.StrictMode>
);
