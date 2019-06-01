import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

import { ngInit } from './utils/initializer-switch';

import { routesConfig } from './config';

const container = document.querySelector('#app')

ngInit(container, () => {
    ReactDOM.render(<App />, container);
}, routesConfig);