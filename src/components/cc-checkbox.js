import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ng2React from '../utils/component-switch';


export default class CcCheckbox extends Component {
    
    static propTypes = {
       config: PropTypes.shape({
           ngModel: PropTypes.any,
           ngChecked: PropTypes.bool,
           ngDisabled: PropTypes.bool,
           ngTrueValue: PropTypes.any,
           ngFalseValue: PropTypes.any,
           indeterminate: PropTypes.bool
       }).isRequired,
       children: PropTypes.string,
       onChange: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.C = ng2React({
            template: `
            <cc-checkbox
                ng-model="$ctrl.props.config.ngModel"
                ng-disabled="$ctrl.props.config.ngDisabled"
                ng-checked="$ctrl.props.config.ngChecked"
                ng-true-value="$ctrl.props.config.ngTrueValue"
                ng-false-value="$ctrl.props.config.ngFalseValue"
                indeterminate="$ctrl.props.config.indeterminate"
                ng-click="$ctrl.change()"
            >
            {{$ctrl.props.children}}
            </cc-checkbox>
            `,
            context: this
        })
    }

    get result() {
        return this.props.config.ngModel;
    }

    change() {
        const cb = this.props.onChange;
        typeof cb === 'function' && cb(this.props.ngModel);
    }

    render() {
        return <this.C />;
    }
}