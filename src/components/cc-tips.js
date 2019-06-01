import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ng2React, { getService } from '../utils/component-switch';


export default class CcTips extends Component {

    static propTypes = {
        config: PropTypes.shape({
            msg: PropTypes.string.isRequired,
            type: PropTypes.string
        }).isRequired
     }

     static type = {
        NORMAL: 'normal',
        MAJOR: 'major',
        WARNING: 'warning'
     }

     static success(msg, container) {
        return this.$ccTips.success(msg, container)
     }

     static error(msg, contianer) {
         return this.$ccTips.error(msg, contianer);
     }

     get $ccTips() {
         getService('$ccTips');
     }
    
    constructor(props) {
        super(props);
        this.C = ng2React({
            template: `<cc-tips msg="$ctrl.props.config.msg" type="{{$ctrl.props.config.type || 'normal'}}"></cc-tips>`,
            context: this
        });
    }

    render() {
        return <this.C />;
    }
}