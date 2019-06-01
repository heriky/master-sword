import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ng2React from '../utils/component-switch';


export default class CcDatePicker extends Component {

    static propTypes = {
        config: PropTypes.shape({
            dateValue: PropTypes.instanceOf(Date),
            minDate: PropTypes.instanceOf(Date),
            maxDate: PropTypes.instanceOf(Date),
            dateOnly: PropTypes.bool,
            required: PropTypes.bool,
            disabled:  PropTypes.bool
        }).isRequired,
        onCalendarClose: PropTypes.func,
        onCalendarOpen: PropTypes.func
    } 

    static defaultProps = {
        config: {
            dateOnly: false,
            required: false,
            disabled: false
        }
    };

    constructor(props) {
        super(props);
        this.C = ng2React({
            template: `
            <cc-date-picker 
                ng-model="$ctrl.props.config.dateValue"
                min-date="$ctrl.props.config.minDate"
                max-date="$ctrl.props.config.maxDate"
                date-only="$ctrl.props.config.dateOnly"
                required="$ctrl.props.config.required"
                disabled="$ctrl.props.config.disabled"
                on-calendar-open="$ctrl.open()"
                on-calendar-close="$ctrl.close()"
                >
            </cc-date-picker> 
            `,
            context: this
        });
    }
    
    get result() {
        return this.props.config.dateValue;
    }

    open() {
        const cb = this.props.onCalendarOpen;
        typeof cb === 'function' && cb(this.result);
    }

    close() {
        const cb = this.props.onCalendarClose;
        // debugger;
        typeof cb === 'function' && cb(this.result);
    }

    render() {
        return <this.C/>
    }
}