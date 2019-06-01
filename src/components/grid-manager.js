import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ng2React from '../utils/component-switch';


export default class GridManager extends Component {
    
    static propTypes = {
       context: PropTypes.any,
       option: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.props.context.option = this.props.option;
        this.C = ng2React({
            template: `<grid-manager option="$ctrl.option"></grid-manager>`,
            context: this.props.context
        })
    }

    render() {
        return <this.C></this.C>
    }
}
