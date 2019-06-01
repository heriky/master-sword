import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ng2React from '../utils/component-switch';


export default class CcCheckbox extends Component {
    
    static propTypes = {
       config: PropTypes.shape({
           ngModel: PropTypes.any.isRequired,
           ngDisabled: PropTypes.bool,
           valueOn: PropTypes.any,
           valueOff: PropTypes.any,
           textOn: PropTypes.string,
           textOff: PropTypes.string
       }).isRequired,
       onChange: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.C = ng2React({
            template: `
            <cc-toggle 
                ng-click="$ctrl.change()"
                ng-model="$ctrl.props.config.ngModel" 
                ng-disabled="$ctrl.props.config.ngDisabled"
                text-on="{{$ctrl.props.config.textOn || '已开启'}}" 
                text-off="{{$ctrl.props.config.textOff || '已关闭'}}"
                value-on="$ctrl.props.config.valueOn"
                value-off="$ctrl.props.config.valueOff"></cc-toggle>
            `,
            context: this
        });
    }

    get result() {
        return this.props.config.ngModel;
    }

    change() {
        const cb = this.props.onChange;
        typeof cb === 'function' && cb(this.result);
    }

    render() {
        return <this.C></this.C>
    }
};