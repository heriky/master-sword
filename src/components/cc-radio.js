import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ng2React from '../utils/component-switch';


export default class CcRadio extends Component {

    static propTypes = {
        config: PropTypes.shape({
            ngModel: PropTypes.any.isRequired,
            ngDisabled: PropTypes.bool,
            ngValue: PropTypes.any
        }).isRequired,
        children: PropTypes.string,
        onChange: PropTypes.func
     }

    constructor(props) {
        super(props);

        this.C = ng2React({
            template: `
            <cc-radio 
                ng-model="$ctrl.props.config.ngModel" 
                ng-disabled="$ctrl.props.config.ngDisabled" 
                ng-click="$ctrl.change()"
                ng-value="$ctrl.props.config.ngValue">{{$ctrl.props.children}}</cc-radio>`,
            context: this
        });
    }

    get result() {
        return this.props.config.ngModel;
    }

    change() {
        const cb = this.props.onChange;
        typeof cb === 'function' && cb(this.props.config.ngModel);
    }

    render() {
        return <this.C />;
    }
}