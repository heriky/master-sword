import React, { Component, useMemo, PureComponent } from 'react';

import CcDatePicker from './components/cc-date-picker';
import CcDateRange from './components/cc-date-range';
import CcMenu from './components/cc-menu';
import CcLoading from './components/cc-loading';
import CcDropdownSelect from './components/cc-dropdown-select';
import CcDropdownMultiSelect from './components/cc-dropdown-mulitiselect';
import CcCcheckBox from './components/cc-checkbox';
import CcRadio from './components/cc-radio';
import CcToggle from './components/cc-toggle';
import CcToolTip from './components/cc-tooltip';
import CcTabSet from './components/cc-tabset';
import GridManager from './components/grid-manager';

import { getService } from './utils/component-switch'
import { HashRouter, Route } from 'react-router-dom';

export default class App extends Component {

    dataPickerConfig = {
        dateValue: new Date(),
        dateOnly: true
    }
    dateRangeConfig = {
        maxDate: new Date('2019-06-10 09:00'),
        start: new Date()
    }
    menuConfig = {
        menuSource: [{
			name: '客户资产分析',
			state: 'customerInsight.customerAssets',
			children: [{
				name: '客户资产分析',
				state: 'customerInsight.customerAssets.preview'
			}, {
				name: '活跃客户复购分析',
				state: 'customerInsight.customerAssets.activeConsume'
			}, {
				name: '客户保持率分析',
				state: 'customerInsight.customerAssets.customerRemain'
			}]
        }],
        unfold: true
    };

    dropdownConfig = {
        datalist: [{ name: '吃饭', id: 1 }, { name: '睡觉', id: 2 }, { name: '啦啦啦', id: 3 }],
        mapping: { valueField: 'id', displayField: 'name' },
        placeholder: '选一个吧，大爷'
    };

    multiConfig = {
        model: [],
        datalist: [{ name: '吃饭', id: 1 }, { name: '睡觉', id: 2 }, { name: '啦啦啦', id: 3 }],
        mapping: { valueField: 'id', displayField: 'name' },
        placeholder: '默认全选啊',
        confirmButton: true
    };

    checkboxConfig = {
        indeterminate: true
    }

    state = {config: {name: 'hankang _____'}};

    gmOpts =  {
        gridManagerName: 'grade-change-gm',
        supportAjaxPage: true,
        supportDrag: false,
        supportAdjust: false,
        supportSorting: true,
        isIconFollowText: true,
        pageSize: 10,
        ajax_data: (setting, qs) => {
            return Promise.resolve({
                list: [{ name: 'hankang', age: 28}, { name: '吃饭', age: 12 }, { name: '打游戏', age: 22 }],
                pageSize: 10,
                pageNum: 1,
                totals: 2
            })
        },

        // 表格列配置参数
        columnData: [{
            key: 'name',
            text: '平台账号',
            align: 'center'
        }, {
            key: 'age',
            text: '年龄',
            align: 'center',
            template: () => '<span style="color:red" ng-click="$ctrl.gridClick(row)">当前年龄为{{row.name}}</span>'
        }]
    };

    gridClick(row) {
        alert(row.name);
    }

    handleCalendarClose = v => {
        getService('$ccTips').success('当前日期是:' + JSON.stringify(v));
    }

    render() {
        return <HashRouter>
        <>
                <CcDatePicker config={this.dataPickerConfig}/>
                <div style={{color: 'red', fontWeight: 700}}>混合测试，啦啦啦</div>
                <CcDateRange config={this.dateRangeConfig}></CcDateRange>
                <CcMenu config={this.menuConfig}></CcMenu>
                <Route path="/customerInsight/cusstomer-assets/preview" component={CcLoading}></Route>

                <CcDropdownSelect config={this.dropdownConfig} onDropdownOpen={v => alert(v)}></CcDropdownSelect>
                <CcDropdownMultiSelect config={this.multiConfig}></CcDropdownMultiSelect>
                <CcCcheckBox config={this.checkboxConfig}>2</CcCcheckBox>
                <CcCcheckBox config={this.checkboxConfig}>3</CcCcheckBox>
                <CcCcheckBox config={this.checkboxConfig}>1</CcCcheckBox>
                <CcRadio config={{ ngValue: 2, ngModel: 2 }}> 男女 </CcRadio>

                <CcToggle config={{ ngModel: true }} onChange={v => { console.log('current value: ' + v) }}></CcToggle>
                <CcToolTip config={{ccTooltip: '测试消息啦啦啦'}}></CcToolTip>

                <CcTabSet config={{active: 0, list: [{ title: '基准积分标准' }, { title: '奖励积分规则' }]}} onSelect={v => console.log(v)}>
                </CcTabSet>

                <GridManager context={this} option={this.gmOpts}></GridManager>
                <Te config={this.state.config}></Te>
                <button onClick={() => {this.setState({ config: { name: this.state.config.name + Date.now() } })}}>测试</button>
        </>
        </HashRouter>;
    }
}


class Te extends PureComponent {
    render() {
        return <div>{this.props.config.name}</div>
    }
}

