import React from 'react';
import {Select, Button, Icon} from './antd/antd.js';
const {Option, OptGroup} = Select;

import {isNotEmptySelect, getFirstObjByArray} from './Common.jsx'

class PropertySelect extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			list: [],
			loaded: false
		}
	}

	selectOnSearch(value){
		let me = this;
		this.props.propertyList(value).then(function(items){
			if(value !== undefined){
				items = items.filter(function(item){
					return item.name && item.name.indexOf(value) > -1;
				});
			}
			me.setState({ list:items, loaded: true });
		});
	}

	onChange({key, label}){
		var property = this.state.list.filter(function(item){
			return item.key === key;
		});
		this.props.onPropertyChange(getFirstObjByArray(property));
	}

	componentDidMount(){
		this.selectOnSearch();
	}

	getOption(item, dropdownMaxWidth){
		//const me = this, iconWidth = 16;
		//let $types = item.types.map( (type) => {
		//	return <Icon key={type} className={`dropdown-icon-${type}`} style={{fontSize: 14, width: 16}} type="cross-circle" />;
		//});
		//const optNameStyle = {
		//	overflow: 'hidden',
		//	textOverflow: 'ellipsis',
		//	display: 'inline-block',
		//	width: dropdownMaxWidth - 40 - item.types.length * iconWidth
		//};
		//return <Option key={item.key} label={item.name}><span style={optNameStyle}>{item.name}</span><span>{$types}</span></Option>;
	}

	render() {
		const me = this;
		const {state, props} = me;
		const {list, loaded} = state;
		const {isAndAndOr, relationWidth, relation, property, and, or} = props;
		let options, dropdownMaxWidth = 300;

		if(list.length === 0){
			if(loaded){
				options = <Option disabled key="__noData__">no data</Option>;
			}else{
				options = <Option disabled key="__loading__">loading ...</Option>;
			}
		}else{
			options = list.map( (item) => <Option key={item.key} label={item.name}>{item.name}</Option>);
		}

		let defaultValue;
		if(isNotEmptySelect(property.key)){
			defaultValue = { key: property.key, label: property.name};
		}

		let selectWidth = 140;
		if(relation === or && isAndAndOr){
			selectWidth = selectWidth - relationWidth;
		}

		return <div className="PropertySelect">
			<Select
				value={defaultValue}
				dropdownMatchSelectWidth={false}
				dropdownStyle={{maxWidth: dropdownMaxWidth}}
				labelInValue
				onSearch={this.selectOnSearch.bind(this)}
				placeholder="选择属性..."
				onChange={this.onChange.bind(this)}
				style={{width: selectWidth}}>
				{options}
			</Select>
		</div>
	}

};

export default PropertySelect;
