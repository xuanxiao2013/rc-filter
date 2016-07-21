import React from 'react';
import {Select, Button} from './antd/antd.js';
const {Option, OptGroup} = Select;

import {isNotEmptySelect, getFirstObjByArray} from './Common.jsx';

class TypeSelect extends React.Component {

	static getList(property, typeMap){
		let list = [];
		for (let [key, value] of typeMap) {
			property.types.forEach((k) => {
				if(key === k){
					list.push({key: key, name: value.name})
				}
			});
		}
		return list;
	}

	constructor(props, context) {
		super(props, context);
	}

	onChange({key, label}){
		const {property, typeMap} = this.props;
		const type = TypeSelect.getList(property, typeMap).filter(function(item){
			return item.key === key;
		});
		this.props.onTypeChange(getFirstObjByArray(type));
	}

	render() {
		const {state, props} = this, {typeMap, property, type} = props, list = TypeSelect.getList(property, typeMap);
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

		if(isNotEmptySelect(type.key)){
			let selectValue = list.filter( (o) => o.key === type.key);
			if(selectValue.length > 0){
				defaultValue = { key: type.key, label: selectValue[0].name};
			}
		}

		return <div className="TypeSelect">
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

function getTypeByProperty(property, typeMap){
	let selectType = TypeSelect.getList(property, typeMap).filter( (o) => o.key === property.types[0]);
	return getFirstObjByArray(selectType)
}

export {
	TypeSelect,
	getTypeByProperty
};
