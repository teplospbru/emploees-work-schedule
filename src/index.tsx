import React from 'react';
import ReactDom from 'react-dom/client';
import './assets/scss/common.scss';
import { App } from './components/App/App';

const root = ReactDom.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
