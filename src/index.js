import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import ccmsComponents from 'ccms-components';
import ccmsBusinessComponents from '@shuyun/ccms-business-components';
import customerView from 'ccms-customer-view';
import gridManager from 'gridmanager-angular-1.x';
import 'gridmanager-ccms-skin';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

import { ngInit, registerDependencies } from './utils/initializer-switch';

import { routesConfig } from './config';

const container = document.querySelector('#app')

// 注册依赖
let dependencies =  [uiRouter, ngResource, ccmsComponents, ccmsBusinessComponents, customerView, gridManager];
registerDependencies(dependencies);

ngInit(container, () => {
    ReactDOM.render(<App />, container);
}, routesConfig);