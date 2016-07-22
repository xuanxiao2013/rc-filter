import React, {PropTypes} from 'react';
import classnames from 'classnames';

import {Select, Form, Button, Radio} from './antd/antd.js';
const {Option, OptGroup} = Select, FormItem = Form.Item, RadioButton = Radio.Button, RadioGroup = Radio.Group;

import {isNotEmptySelect} from './Common.jsx'
import PropertySelect from './PropertySelect.jsx';
import {TypeSelect, getTypeByProperty} from './TypeSelect.jsx';
import {OperateSelect, getOperateByType} from './OperateSelect.jsx';
import ValueInput from './ValueInput.jsx';


class Filter extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	getBtns(){
		const {props, state} = this;
		const {filterIndex, isAndAndOr, relation, operate, and, or} = props;
		let  $addBtn, $andBtn, $orBtn, $delBtn, $btns;

		$addBtn = <Button className="filterBtn" onClick={props.AndButtonOnclick.bind(this, filterIndex)}>增加</Button>;
		$andBtn = <Button className="filterBtn" onClick={props.AndButtonOnclick.bind(this, filterIndex)}>并且</Button>;
		$orBtn = <Button className="filterBtn" onClick={props.OrButtonOnclick.bind(this, filterIndex)}>或者</Button>;
		$delBtn = <Button className="filterBtn" onClick={props.DelButtonOnclick.bind(this, filterIndex)}>删除</Button>;

		if(isNotEmptySelect(operate.key)){

			if(isAndAndOr){
				if(relation === or){
					$btns = <span className="filterBtns">{$orBtn} {$delBtn} </span>
				}else{
					$btns = <span className="filterBtns">{$andBtn} {$orBtn} {$delBtn} </span>
				}
			}else{
				$btns = <span className="filterBtns">{$addBtn} {$delBtn}</span>
			}

		}else{

			if(isAndAndOr){
				$btns = <span className="filterBtns">{$delBtn}</span>;
			}else{
				$btns = <span className="filterBtns">{$delBtn}</span>;
			}

		}
		return $btns;
	}

	getRelation(style){
		let {filterIndex, relation, isAndAndOr, and, or, firstRelationTxt, relationRadioStyle} = this.props;
		let $relation;

		function onChange(e){
			this.props.onRelationChange(e.target.value)
		}

		if(isAndAndOr){
			$relation = filterIndex === 0 ? firstRelationTxt : relation;
		}else{

			$relation = (<RadioGroup onChange={onChange.bind(this)} value={relation}>
				<RadioButton style={relationRadioStyle} value={and}>{and}</RadioButton>
				<RadioButton style={relationRadioStyle} value={or}>{or}</RadioButton>
			</RadioGroup>);

			if(filterIndex > 0 ){
				$relation = relation;
			}
		}
		return <span style={style} className="relationSpan">{$relation}</span>;
	}

	render() {

		const {props, state} = this;
		const {
			containerWidth, relationWidth,
			filterIndex, isAndAndOr, and, or, timeFormat,
			relation, property, type, operate, valueInput,
			onPropertyChange, onTypeChange, onOperateChange, onValueInputChange,
			propertyList, valueInputList, typeMap
			} = props;
		let $property, $types, $operate, $valueInput;

		$property =<PropertySelect
			and={and}
			or={or}
			relationWidth={relationWidth}
			isAndAndOr={isAndAndOr}
			relation={relation}
			property={property}
			onPropertyChange={onPropertyChange.bind(this, [filterIndex])}
			propertyList={propertyList}
			/>;

		if(isNotEmptySelect(property.key)){
			$types = <TypeSelect
				typeMap={typeMap}
				property={property}
				type={type}
				onTypeChange={onTypeChange.bind(this, [filterIndex])}
				/>;
		}

		if(isNotEmptySelect(type.key)){
			$operate = <OperateSelect
				typeMap={typeMap}
				property={property}
				type={type}
				operate={operate}
				onOperateChange={onOperateChange.bind(this, [filterIndex])}/>
		}

		if(isNotEmptySelect(operate.key)){
			$valueInput = <ValueInput
				and={and}
				or={or}
				timeFormat={timeFormat}
				typeMap={typeMap}
				valueInputList={valueInputList}
				property={property}
				type={type}
				operate={operate}
				valueInput={valueInput}
				onValueInputChange={onValueInputChange.bind(this, [filterIndex])}/>
		}


		const warpFormCls = {
			['warpFormDiv']: 1,
			[`warpForm-${relation.toLowerCase()}`]: isAndAndOr
		};

		let warpFormStyle = {},
			filterFormStyle = {},
			relationSpanStyle = {width: relationWidth},
			formItemWarpStyle = {width: containerWidth - 290};

		if(isAndAndOr && relation === or){
			warpFormStyle.marginLeft = (relationWidth / 2);
			filterFormStyle.marginLeft = (relationWidth / 2);
			filterFormStyle.width = containerWidth - relationWidth;
			formItemWarpStyle.width = formItemWarpStyle.width - relationWidth;
		}


		return (
			<div className={classnames(warpFormCls)} style={warpFormStyle}>
				<Form inline className="filterForm" style={filterFormStyle}>
					{this.getRelation(relationSpanStyle)}
					<span className="formItemWarp" style={formItemWarpStyle}>
						<FormItem className="formItem">{$property}</FormItem>
						<FormItem className="formItem">{$types}</FormItem>
						<FormItem className="formItem">{$operate}</FormItem>
						<FormItem className="formItem">{$valueInput}</FormItem>
					</span>
					{this.getBtns()}
				</Form>
			</div>
		)
	}
}

export {
	Filter,
	getTypeByProperty,
	getOperateByType
}