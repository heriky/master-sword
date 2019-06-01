import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ng2React, { getService } from '../utils/component-switch';

export default class CcMenu extends Component {

    static propTypes = {
        config: PropTypes.shape({
            unfold: PropTypes.bool,
            menuSource: PropTypes.array,
            shopSource: PropTypes.array,
            searchPlaceholder: PropTypes.string,
            shopEnable: PropTypes.bool
        }).isRequired,
        onUnfold: PropTypes.func
    } 
    static defaultProps = {
        config: {
            unfold: true,
            menuSource: [],
            shopSource: [],
            searchPlaceholder: '请输入店铺名称'
        },
        onUnfold: PropTypes.func,
        onShopChangeStart: PropTypes.func,
        onShopChange: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.C = ng2React({
            template: `
                <cc-menu-bar
                    unfold="$ctrl.props.config.unfold"
                    menu-source="$ctrl.props.config.menuSource"
                    shop-source="$ctrl.props.config.shopSource"
                    search-placeholder="$ctrl.props.config.searchPlaceholder || '请输入店铺名称'"
                    on-unfold="$ctrl.unfoldClick">
                </cc-menu-bar>`,
            context: this
        });
    }

    get ccMenus() {
        return getService('$ccMenus');
    }

    get currentShop() {
        return this.ccMenus.getCurrentPlatShop();
    }

    unfoldClick (){
        const cb = this.props.onUnfold;
        typeof cb === 'function' && cb();
    }

    componentDidMount() {

        // 注册事件
        const changeStart = this.props.onShopChangeStart;
        const changeSuccess = this.props.onShopChange;
        this.shopChangeStartHook = this.ccMenus.onShopChangeStart((defer, willPlatShop) => {
            typeof changeStart === 'function' && changeStart(willPlatShop);
        });
        this.shopChangeSuccessHook = this.ccMenus.onShopChange(current => {
            typeof changeSuccess === 'function' && changeSuccess(current);
        });

        // 设置店铺
        this.props.config.shopEnable ? this.ccMenus.shopChangeEnable() : this.ccMenus.shopChangeDisable();

    }

    componentWillUnmount() {
        this.shopChangeStartHook && this.shopChangeStartHook();
        this.shopChangeSuccessHook && this.shopChangeSuccessHook();
    }

    render() {
        return <this.C />;
    }
}