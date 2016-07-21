import React from 'react';
import {Select, Button, Input, DatePicker, InputNumber} from './antd/antd.js';
const {Option, OptGroup} = Select;
const RangePicker = DatePicker.RangePicker;

import {
	EMPTY_VALUR_FILTER,
	MUL_SELECT_VALUE_FILTER,
	STRING_INPUT_VALUE_FILTER,
	NUMBER_INPUT_VALUE_FILTER,
	NUMBER_INPUT_RANGR_VALUE_FILTER,
	TIME_INPUT_VALUE_FILTER,
	TIME_INPUT_RANGE_VALUE_FILTER,

	isNotEmptySelect, isNumber} from './Common.jsx';

const RANGEONE = 'rangeOne', RANGETWO = 'rangeTwo';

class ValueInput extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			mulSelectList: [], mulSelectListLoaded: false
		}
	}

	inputValueChangehandle(inputValueType, value, enter){
		let valueInput = [];
		switch (inputValueType){
			case STRING_INPUT_VALUE_FILTER :
			case NUMBER_INPUT_VALUE_FILTER :
			case TIME_INPUT_VALUE_FILTER :
			case TIME_INPUT_RANGE_VALUE_FILTER :
			case MUL_SELECT_VALUE_FILTER : valueInput = [value]; break;
			case NUMBER_INPUT_RANGR_VALUE_FILTER:
				if(value[0] === RANGEONE) valueInput[0] = value[1];
				if(value[0] === RANGETWO) valueInput[1] = value[1];
				break;
		}
		this.props.onValueInputChange(valueInput)
	}

	selectValueMulSelectOnSearch(value){
		const me = this;
		me.props.valueInputList(value).then(function(items){
			if(value !== undefined){
				items = items.filter(function(item){
					return item.name && item.name.indexOf(value) > -1;
				});
			}
			me.setState({ mulSelectList:items, mulSelectListLoaded: true });
		});
	}

	getValueInputEmpty(){
		return <span></span>;
	}

	getValueInputDateTime(){
		const me = this;
		function onChange(oDate, dateString){
			//console.log(oDate, dateString)
			me.inputValueChangehandle(NUMBER_INPUT_VALUE_FILTER, dateString, true);
		}

		return <DatePicker
			style={{ width: 150 }}
			showTime
			onChange={onChange.bind(this)}
			format={this.props.timeFormat}/>;
	}
	getValueInputDateTimeRange(){
		const me = this;
		function onChange(oDate, dateString){
			//console.log(oDate, dateString)
			me.inputValueChangehandle(NUMBER_INPUT_VALUE_FILTER, dateString, true);
		}
		return <RangePicker
			style={{ width: 300 }}
			showTime
			onChange={onChange.bind(this)}
			format={this.props.timeFormat}
			/>;
	}

	getValueInputNumberRange(){
		return <span>在{this.getValueInputNumberInput(RANGEONE)}于{this.getValueInputNumberInput(RANGETWO)}之间</span>;
	}
	getValueInputNumberInput(range){
		const me = this, defaultValue = 1;
		function onPressEnter(e){
			let value = Number(e.target.value);
			if(parseInt(e.which, 10) === 13 && isNumber(value)){
				handle(NUMBER_INPUT_VALUE_FILTER, value, true)
			}
		}
		function onChange(value){
			handle(NUMBER_INPUT_VALUE_FILTER, value)
		}

		function handle(valueInputType, value, enter){
			let oValue;
			if(range === RANGEONE || range === RANGETWO){
				oValue = [range, value];
			}else{
				oValue = value;
			}
			me.inputValueChangehandle(NUMBER_INPUT_VALUE_FILTER, value, enter);
		}

		return <InputNumber
			defaultValue={defaultValue}
			step={0.01}
			onChange={onChange.bind(this)}
			onKeyUp={onPressEnter.bind(this)}
			type="input" style={{width: 100}}/>;
	}

	getValueInputInput(){
		const me = this;
		function onPressEnter(e){
			me.inputValueChangehandle(STRING_INPUT_VALUE_FILTER, e.target.value, true);
		}
		function onChange(e){
			me.inputValueChangehandle(STRING_INPUT_VALUE_FILTER, e.target.value)
		}
		return <Input style={{width: 100}}
									onChange={onChange.bind(this)}
									onPressEnter={onPressEnter.bind(this)}
			/>;
	}

	getValueInputMulSelect(){
		const me = this, {props, state} = me;
		let {mulSelectList, mulSelectListLoaded} = state,
			{valueInputList} = props,
			$options;

		if(mulSelectList.length > 0){
			$options = mulSelectList.map((o) => {
				return (<Option key={o.key}>{o.name}</Option>);
			});
		}else{
			if(mulSelectListLoaded){
				$options = <Option disabled key="no data">no data</Option>;
			}else{
				$options = <Option disabled key="loading">loading ...</Option>;
			}
		}

		function onChange(value){
			let valueInput = [];
			value.forEach((o) => {
				valueInput.push({
					name: o.label,
					key: o.key
				})
			})
			me.inputValueChangehandle(MUL_SELECT_VALUE_FILTER, valueInput, true);
		}

		return <Select
			multiple
			labelInValue
			style={{ width:300 }}
			onSearch={this.selectValueMulSelectOnSearch.bind(this)}
			onChange={onChange.bind(this)}
			placeholder="select..."
			>
			{$options}
		</Select>;
	}

	componentDidMount(){
		let $valueType = this.getValueType();
		if($valueType === MUL_SELECT_VALUE_FILTER){
			this.selectValueMulSelectOnSearch();
		}
	}

	getValueType(){
		let {valueInputList, typeMap, property, type, operate} = this.props
		let $valueType;
		for (let [key, value] of typeMap) {
			if(key === type.key){
				value.operate.forEach((o) => {
					if(o.key === operate.key){
						$valueType = o.valueType;
					}
				});
			}
		}
		return $valueType;
	}

	render() {
		const {state, props} = this, {valueInputList, typeMap, property, type, operate} = props;

		let $valueType = this.getValueType(), $valueTypeHtml = '';

		switch ($valueType){
			case EMPTY_VALUR_FILTER: $valueTypeHtml = this.getValueInputEmpty();break;
			case MUL_SELECT_VALUE_FILTER: $valueTypeHtml = this.getValueInputMulSelect();break;
			case STRING_INPUT_VALUE_FILTER: $valueTypeHtml = this.getValueInputInput();break;
			case NUMBER_INPUT_VALUE_FILTER: $valueTypeHtml = this.getValueInputNumberInput();break;
			case NUMBER_INPUT_RANGR_VALUE_FILTER: $valueTypeHtml = this.getValueInputNumberRange();break;
			case TIME_INPUT_VALUE_FILTER: $valueTypeHtml = this.getValueInputDateTime();break;
			case TIME_INPUT_RANGE_VALUE_FILTER: $valueTypeHtml = this.getValueInputDateTimeRange();break;
		}

		return <div>
			{$valueTypeHtml}
		</div>
	}

};

export default ValueInput;
