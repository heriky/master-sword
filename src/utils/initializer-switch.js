import angular from 'angular';

// 这些均属于外部依赖，应该由外部传入！！
let MODULE_NAME = '__hybird__';
let CONTROLLER_NAME = '__hybridController__';

let dependencies =  [];

/**
 * 为angular提供运行与编译环境
 * @param {*} dom 根节点dom
 * @param {*} cb ng初始化完成后的
 * @param {*} stateList ng路由状态对应的url映射，格式为[{ state: 'aaa', url: '/aaa' }]
 */
export function ngInitOnDOM(dom, cb, stateList) {
    if (!dom) throw new Error('cannot find angular root dom');
    dom.setAttribute('ng-app', MODULE_NAME);
    dom.setAttribute('ng-controller', CONTROLLER_NAME);
    
    angular.module(MODULE_NAME, dependencies)
        .controller(CONTROLLER_NAME, function() {
            cb.apply(this)
        })
        .config($stateProvider => {
            stateList.forEach(({state, url}) => {
                $stateProvider.state(state, { url });
            })
        })
}

export function ngInitOnApp({ moduleName = MODULE_NAME, controllerName = CONTROLLER_NAME, dependencies = [], stateList = [] }, cb) {
    angular.module(moduleName, dependencies)
        .controller(controllerName, function() {
            cb.apply(this)
        })
        .config($stateProvider => {
            stateList.forEach(({state, url}) => {
                $stateProvider.state(state, { url });
            })
        })
}

export function registerDependencies(arr) {
    // dependencies.push(...arr);
    if (Array.isArray(arr) || arr.length > 0) dependencies = arr;
}

export function registerModuleName(name) {
    MODULE_NAME = name;
}

export function registerControllerName(name){
    CONTROLLER_NAME = name;
}


/**
 * 
 * 理解前端路由的原理， 分为两部分： 
 * 1. 记录
 * 2. 触发执行
 * 记录过程各个框架使用不同的方式，而触发执行均是匹配路径然后组件替换，都是相同的执行原理。
 * 因此，在做跨框架路由兼容时，只需要用框架特定的路由注册方式注册路由即可。
 *
 * 凡是组件内部使用了路由功能，则必须使用routerSwitch进行注册
 */

