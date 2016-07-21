import React from 'react';
import {Select, Button} from './antd/antd.js';
const {Option, OptGroup} = Select;

import {isNotEmptySelect, getFirstObjByArray} from './Common.jsx'

class OperateSelect extends React.Component {

	constructor(props, context) {
		super(props, context);
	}

	static getList(type, typeMap){
		let list = [];
		for (let [key, value] of typeMap) {
			if(key === type.key){
				value.operate.forEach((o) => {
					list.push({key: o.key, name: o.name});
				});
			}
		}
		return list;
	}

	onChange({key, label}){
		const {type, typeMap} = this.props;
		const operate = OperateSelect.getList(type, typeMap).filter((item) => item.key === key);
		this.props.onOperateChange(getFirstObjByArray(operate))
	}

	render() {
		const {state, props} = this, {operate, type, typeMap} = props, list = OperateSelect.getList(type, typeMap);
		let options, defaultValue;

		if(list.length === 0){
			if(loaded){
				options = <Option disabled key="no data">no data</Option>;
			}else{
				options = <Option disabled key="loading">loading ...</Option>;
			}
		}else{
			options = list.map((item) => <Option key={item.key} >{item.name}</Option>)
		}

		defaultValue = { key: operate.key, label: operate.name};

		return <div className="OperateSelect">
			<Select
				value={defaultValue}
				labelInValue
				onChange={this.onChange.bind(this)}
				placeholder="选择..."
				style={{width: 90}}>
				{options}
			</Select>
		</div>
	}

};

function getOperateByType(type, typeMap){
	let selectOperate = OperateSelect.getList(type, typeMap);
	return getFirstObjByArray(selectOperate)
}

export {
	OperateSelect,
	getOperateByType
};
