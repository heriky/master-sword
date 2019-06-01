import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ng2React from '../utils/component-switch';


export default class CcTooltip extends Component {
    
    static propTypes = {
       config: PropTypes.shape({
          ccTooltip: PropTypes.any.isRequired,
          tooltipTrigger: PropTypes.string,
          tooltipPlacement: PropTypes.string,
          tooltipOpened: PropTypes.bool,
          tooltipType: PropTypes.string,
          tooltipAppendToBody: PropTypes.bool,
          tooltipCompilable: PropTypes.bool,
          tooltipOpenDelay: PropTypes.string,
          tooltipCloseDelay: PropTypes.string
       }).isRequired
    }

    static placement = { TOP: 'top', TOP_LEFT: 'top-left', TOP_RIGHT: 'top-right', BOTTOM: 'bottom', BOTTOM_LEFT: 'bottom-left', BOTTOM_RIGHT: 'bottom-right', LEFT: 'left', RIGHT: 'right' }
    static type = { NORMAL: 'normal', ERROR_MINOR: 'error-minor', ERROR_MAJOR: 'error-major' }

    test = 'aaaaa';

    constructor(props) {
        super(props);
        this.C = ng2React({
            template: `
                <span 
                    cc-tooltip="$ctrl.test"
                    tooltip-trigger="$ctrl.props.config.tooltipTrigger"
                    tooltip-placement="$ctrl.props.config.tooltipPlacement"
                    tooltip-opened="$ctrl.props.config.tooltipOpened"
                    tooltip-type="$ctrl.props.config.tooltipType"
                    tooltip-append-to-body="$ctrl.props.config.tooltipAppendToBody"
                    tooltip-compilable="$ctrl.props.config.tooltipCompilable"
                    tooltip-open-delay ="$ctrl.props.config.tooltipOpenDelay"
                    tooltip-close-delay="$ctrl.props.config.tooltipCloseDelay"
                >顶顶顶顶
                </span>`,
            context: this
        });
    }

    render() {
        return <this.C></this.C>
    }
}