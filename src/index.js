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

import { ngInitOnDOM, registerDependencies } from './utils/initializer-switch';

import { routesConfig } from './config';
import test from '../ok-async';

const container = document.querySelector('#app');

// 注册依赖
let dependencies =  [uiRouter, ngResource, ccmsComponents, ccmsBusinessComponents, customerView, gridManager];
registerDependencies(dependencies);

ngInitOnDOM(container, () => {
    ReactDOM.render(<App />, container);
}, routesConfig);

test();