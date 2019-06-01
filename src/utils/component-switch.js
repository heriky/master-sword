import React, { Component } from 'react';
import injector from 'angular-es-utils/injector';

// 自定义标签
window.customElements.define('m-s', class extends HTMLElement {});

export default function ng2React (config) { //  { template: '' , context}
    if (Object.prototype.toString.call(config) !== '[object Object]' || config.template == null ) {
        throw new Error('ng2React调用错误，config必须为包含template和context的对象');
    } 

    const { template, context } = config;
    return class InnerComponent extends Component {

        // dom挂载和卸载的时候，ref回调都会调用
        refCallBack = node => {
            if (node == null) return;
            const dom = ng2DOM(template, context);
            // node.parentNode.replaceChild(dom, node); // 不能直接替换，否则react丢失了该部分
            node.appendChild(dom);
        }

        render() {
            return <m-s ref={this.refCallBack}></m-s>; // <t></t> <div></div> 都不合适
        }
    }
}

export function ng2DOM(template, ctx) {
    const $rootScope = injector.get('$rootScope');
    const $scope = $rootScope.$new();
    
    // 兼容写法
    $scope.$ctrl = ctx;
    $scope.vm = ctx;

    const $compile = injector.get('$compile');
    
    const jqLite = $compile(template)($scope);
    const dom = jqLite[0];

   return dom;
}

export function getService(name) {
    return injector.get(name);
}