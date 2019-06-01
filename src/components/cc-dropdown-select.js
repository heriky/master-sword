import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ng2React from '../utils/component-switch';

export default class CcDropdownSelect extends Component {

    static propTypes = {
        config: PropTypes.shape({
            model: PropTypes.any,
            datalist: PropTypes.array,
            mapping: PropTypes.shape({
                valueField: PropTypes.string, // value
                displayField: PropTypes.string // title
            }),
            placeholder: PropTypes.string,
            searchable: PropTypes.bool,
            disabled: PropTypes.bool,
            isOpen: PropTypes.bool,
            autoClose: PropTypes.bool
        }).isRequired,
        onSelectChange: PropTypes.func,
        onDropdownOpen: PropTypes.func,
        onDropdownClose: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.C = ng2React({
            template: `
            <cc-dropdown-select
                disabled="$ctrl.props.config.disabled"
                model="$ctrl.props.config.model"
                datalist="$ctrl.props.config.datalist"
                mapping="$ctrl.props.config.mapping"
                placeholder="{{$ctrl.props.config.placeholder || ''}}"
                searchable="$ctrl.props.config.searchable"
                disabled="$ctrl.props.config.disabled"
                is-open="$ctrl.props.config.isOpen"
                auto-close="$ctrl.props.config.autoClose"
                on-select-change="$ctrl.selectChange(model, oldModel, itemIndex, item)"
                on-dropdown-open="$ctrl.dropdownOpen()"
                on-dropdown-close="$ctrl.dropdownClose()">
            `,
            context: this
        });
    }

    get result() {
        return this.props.config.model;
    }
    
    selectChange (model, oldModel, itemIndex, item) {
        const cb = this.props.onSelectChange;
        typeof cb === 'function' && cb(model, oldModel, itemIndex, item);
    }
    dropdownOpen() {
        const cb = this.props.onDropdownOpen;
        typeof cb === 'function' && cb(this.result);
    }
    dropdownClose() {
        const cb = this.props.onDropdownClose;
        typeof cb === 'function' && cb(this.result);
    }

    render() {
        return <this.C />;
    }
}