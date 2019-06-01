import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ng2React from '../utils/component-switch';

export default class CcDateRange extends Component {

    static propTypes = {
        config: PropTypes.shape({
            start: PropTypes.instanceOf(Date),
            end: PropTypes.instanceOf(Date),
            minDate: PropTypes.instanceOf(Date),
            maxDate: PropTypes.instanceOf(Date),
            dateOnly: PropTypes.bool,
            required: PropTypes.bool,
            disabled: PropTypes.bool
        }).isRequired,
        onCalendarOpen: PropTypes.func,
        onCalendarClose: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.C = ng2React({
            template: `<cc-date-range opts="$ctrl.props.config" on-calendar-open="$ctrl.open()" on-calendar-close="$ctrl.close()"></date-range>`,
            context: this
        });
    }

    get result() {
        const { start, end } = this.props.config;
        return { start, end };
    }

    open() {
        const cb = this.props.onCalendarOpen;
        typeof cb === 'function' && cb(this.result);
    }

    close() {
        const cb = this.props.onCalendarClose;
        typeof cb === 'function' && cb(this.result);
    }

    render() {
        return <this.C />;
    }
}