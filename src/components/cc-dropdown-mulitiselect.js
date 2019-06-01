import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ng2React from '../utils/component-switch';

export default class CcDropdownSelect extends Component {

    static propTypes = {
        config: PropTypes.shape({
            model: PropTypes.any.isRequired,
            datalist: PropTypes.array.isRequired,
            mapping: PropTypes.shape({
                valueField: PropTypes.string, // value
                displayField: PropTypes.string // title
            }),
            placeholder: PropTypes.string,
            searchable: PropTypes.bool,
            confirmButton: PropTypes.bool,
            isOpen: PropTypes.bool,
            autoClose: PropTypes.bool
        }),
        onSelectChange: PropTypes.func,
        onDropdownOpen: PropTypes.func,
        onDropdownClose: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.C = ng2React({
            template: `
                <cc-dropdown-multiselect
                    model="$ctrl.props.config.model"
                    datalist="$ctrl.props.config.datalist"
                    mapping="$ctrl.props.config.mapping"
                    placeholder="{{$ctrl.props.config.placeholder || ''}}"
                    searchable="$ctrl.props.config.searchable"
                    confirm-button="$ctrl.props.config.confirmButton"
                    is-open="$ctrl.props.config.isOpen"
                    auto-close="$ctrl.props.config.autoClose"                    
                    on-select-change="$ctrl.multiSelectChange(model, oldModel, selection, oldSelection)"
                    on-dropdown-open="$ctrl.dropdownOpen()"
                    on-dropdown-close="$ctrl.dropdownClose()">
                </cc-dropdown-multiselect>`,
            context: this
        });
    }

    multiSelectChange (model, oldModel, selection, oldSelection) {
        const cb = this.props.onSelectChange;
        typeof cb === 'function' && cb(model, oldModel, selection, oldSelection);
    }
    dropdownOpen (){
        const cb = this.props.onDropdownOpen;
        typeof cb === 'function' && cb();
    }
    dropdownClose (){
        const cb = this.props.onDropdownClose;
        typeof cb === 'function' && cb();
    }

    render() {
        return <this.C />;
    }
}