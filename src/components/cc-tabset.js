import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ng2React, { ng2DOM } from '../utils/component-switch';

export default class CcTabSet extends Component {

    static propTypes = {
        config: PropTypes.shape({
            active: PropTypes.number,
            list: PropTypes.arrayOf(PropTypes.shape({
                title: PropTypes.string.isRequired
            })).isRequired
        }).isRequired,
        onSelect: PropTypes.func
     }

    constructor(props) {
        super(props);

        const innerDOM = this.genInnerDOM();
        this.C = ng2React({
            template: `
            <cc-tabset active="$ctrl.props.config.active">
                ${innerDOM}
            </cc-tabset>
            `,
            context: this
        })
    }

    genInnerDOM() {
        const list = this.props.config.list;
        let rs = '';
        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            rs += `
                <cc-tab title="${item.title}" on-select="$ctrl.changeTab(tab)"></cc-tab>`;
        }
        return rs;
    }

    changeTab(tab) {
        const cb = this.props.onSelect;
        typeof cb === 'function' && cb(tab);
    }

    render() {
        return <this.C></this.C>
    }
}