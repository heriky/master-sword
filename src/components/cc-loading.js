import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ng2React from '../utils/component-switch';

export default class CcLoading extends Component {

    constructor(props) {
        super(props);
        this.C = ng2React({
            template: `<cc-loading type="${props.type}">${props.children}</cc-loading>`,
            context: this
        });
    }

    static type = { LAYER: 'layer' }

    render() {
        return <this.C />;
    }
}