import React from 'react';
import ReactDOM from 'react-dom';
import store from './store.jsx';
import {Button, Modal} from '../src/antd/antd.js';

import Filters from '../src/index.jsx';

const {
	EMPTY_VALUR_FILTER,
	MUL_SELECT_VALUE_FILTER,
	STRING_INPUT_VALUE_FILTER,
	NUMBER_INPUT_VALUE_FILTER,
	NUMBER_INPUT_RANGR_VALUE_FILTER,
	TIME_INPUT_VALUE_FILTER,
	TIME_INPUT_RANGE_VALUE_FILTER
	} = Filters;

const
	STRING_TYPE = 'string',
	NUMBER_TYPE = 'number',
	TIME_TYPE = 'date',
	LIST_TYPE = 'list',
	BOOLEAN_TYPE = 'boolean',
	CUSTOM_TYPE = 'custom';

const TypeMap = new Map();
TypeMap.set(STRING_TYPE, {
	name: '字符型',
	operate: [
		{
			key: 'eq',
			name: '等于',
			valueType: MUL_SELECT_VALUE_FILTER
		},
		{
			key: 'noeq',
			name: '不等于',
			valueType: STRING_INPUT_VALUE_FILTER
		},
		{
			key: 'in',
			name: '包含',
			valueType: STRING_INPUT_VALUE_FILTER
		},
		{
			key: 'noin',
			name: '不包含',
			valueType: MUL_SELECT_VALUE_FILTER
		},
		{
			key: 'empty',
			name: '为空',
			valueType: EMPTY_VALUR_FILTER
		},
		{
			key: 'noempty',
			name: '不为空',
			valueType: EMPTY_VALUR_FILTER
		}
	]
});
TypeMap.set(NUMBER_TYPE, {
	name: '数值型',
	operate: [
		{
			key: 'eq',
			name: '等于',
			valueType: NUMBER_INPUT_VALUE_FILTER
		},
		{
			key: 'noeq',
			name: '不等于',
			valueType: NUMBER_INPUT_VALUE_FILTER
		},
		{
			key: 'gt',
			name: '大于',
			valueType: NUMBER_INPUT_VALUE_FILTER
		},
		{
			key: 'lt',
			name: '小于',
			valueType: NUMBER_INPUT_VALUE_FILTER
		},
		{
			key: 'range',
			name: '在...与...',
			valueType: NUMBER_INPUT_RANGR_VALUE_FILTER
		}
	]
});
TypeMap.set(TIME_TYPE, {
	name: '时间型',
	operate: [
		{
			key: 'early',
			name: '早于',
			valueType: TIME_INPUT_VALUE_FILTER
		},
		{
			key: 'later',
			name: '晚于',
			valueType: TIME_INPUT_VALUE_FILTER
		},
		{
			key: 'range',
			name: '在...与...',
			valueType: TIME_INPUT_RANGE_VALUE_FILTER
		}
	]
});
TypeMap.set(LIST_TYPE, {
	name: '列表型',
	operate: [
		{
			key: 'in',
			name: '包含',
			valueType: STRING_INPUT_VALUE_FILTER
		}
	]
});
TypeMap.set(BOOLEAN_TYPE, {
	name: '真假型',
	operate: [
		{
			key: 'true',
			name: '为真',
			valueType: EMPTY_VALUR_FILTER
		},
		{
			key: 'false',
			name: '为假',
			valueType: EMPTY_VALUR_FILTER
		}
	]
});
TypeMap.set(CUSTOM_TYPE, {
	name: '自定义类型- 超长测试- 超长测试- 超长测试- 超长测试- 超长测试- 超长测试',
	operate: [
		{
			key: 'empty',
			name: '空',
			valueType: EMPTY_VALUR_FILTER
		},
		{
			key: 'mulselect',
			name: '多选',
			valueType: MUL_SELECT_VALUE_FILTER
		},
		{
			key: 'stringInput',
			name: '字符串输入框',
			valueType: STRING_INPUT_VALUE_FILTER
		},
		{
			key: 'numberInput',
			name: '数值输入框',
			valueType: NUMBER_INPUT_VALUE_FILTER
		},
		{
			key: 'numberRangeInput',
			name: '数值区间输入框',
			valueType: NUMBER_INPUT_RANGR_VALUE_FILTER
		},
		{
			key: 'time',
			name: '时间',
			valueType: TIME_INPUT_VALUE_FILTER
		},
		{
			key: 'timeRange',
			name: '时间区间',
			valueType: TIME_INPUT_RANGE_VALUE_FILTER
		}
	]
});

function propertyList() {
	return new Promise(function (resolve, reject) {
		let items = [
			{
				key: 'add',
				name: '字符型',
				types: [STRING_TYPE]
			},
			{
				key: 'a2',
				name: '字符型数值',
				types: [STRING_TYPE, NUMBER_TYPE]
			},
			{
				key: 'a3',
				name: '字符型数值时间',
				types: [STRING_TYPE, NUMBER_TYPE, TIME_TYPE]
			},
			{
				key: 'a4',
				name: '字符型数值时间列表',
				types: [STRING_TYPE, NUMBER_TYPE, TIME_TYPE, LIST_TYPE]
			},
			{
				key: 'a5',
				name: '字符型数值时间列表布尔',
				types: [STRING_TYPE, NUMBER_TYPE, TIME_TYPE, LIST_TYPE, BOOLEAN_TYPE]
			},
			{
				key: 'a6',
				name: '所有inputValue - 超长测试- 超长测试- 超长测试-超长测试sadfasdfasdfasdfasdf 超长测试- 超长测试- 超长测试sadfasdfasdfasdfasdf',
				types: [STRING_TYPE, NUMBER_TYPE, TIME_TYPE, LIST_TYPE, BOOLEAN_TYPE, CUSTOM_TYPE]
			}
		];
		//console.log('propertyList ajax');
		resolve(items);
	});
}

function valueInputList(value, property, type, operate) {
	//console.log(value, property, type, operate)
	return new Promise(function (resolve, reject) {
		let items = [];
		for (let i = 10; i < 36; i++) {
			items.push({
				key: i.toString(36) + i,
				name: i.toString(36) + i
			})
		}
		resolve(items);
		//setTimeout(() => {
		//	console.log('valueInputList ajax');
		//	resolve(items);
		//}, 2000);
	});
}

const StoreKey1 = 'rc-filter-json1', StoreKey2 = 'rc-filter-json2';

class DemoFilter extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	getFilter1(filter1){
		function onChangeValueInput1(json) {
			filter1 = json;
		}
		function onClick1(){
			store.set(StoreKey1, filter1);
			alert('保存成功');
			location.reload();
		}
		function onClickClean1(){
			store.remove(StoreKey1);
			alert('删除成功');
			location.reload();
		}

		return (<div>
			<Filters
				propertyList={propertyList}
				valueInputList={valueInputList}
				typeMap={TypeMap}
				onChangeValueInput={onChangeValueInput1}
				filters={filter1}
				/>
			<div style={{textAlign: 'center'}}>
				<Button onClick={onClick1.bind(this)}>保存</Button>
				<Button onClick={onClickClean1.bind(this)}>clean store</Button>
			</div>
		</div>);
	}

	getFilter2(filter2){
		function onChangeValueInput2(json) {
			filter2 = json;
		}
		function onClick2(){
			store.set(StoreKey2, filter2);
			alert('保存成功');
			location.reload();
		}
		function onClickClean2(){
			store.remove(StoreKey2);
			alert('删除成功');
			location.reload();
		}
		return (<div>
			<Filters
				isAndAndOr={false}
				relationWidth={116}
				propertyList={propertyList}
				valueInputList={valueInputList}
				typeMap={TypeMap}
				filters={filter2}
				onChangeValueInput={onChangeValueInput2}
				/>
			<div style={{textAlign: 'center'}}>
				<Button onClick={onClick2.bind(this)}>保存</Button>
				<Button onClick={onClickClean2.bind(this)}>clean store</Button>
			</div>
		</div>);
	}

	render() {
		let filter1 = store.get(StoreKey1), filter2 = store.get(StoreKey2);
		return <div className="filtersQuery">
			{this.getFilter1(filter1)}
			{this.getFilter2(filter2)}
		</div>
	}
}
ReactDOM.render(<DemoFilter />, document.getElementById('bodyRoot'));
