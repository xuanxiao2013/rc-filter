import React, {PropTypes} from 'react';
import classnames from 'classnames';

import {Select, Form, Button, DatePicker} from './antd/antd.js';
const {Option, OptGroup} = Select, FormItem = Form.Item;

import {isNotEmptySelect} from './Common.jsx'
import {Filter, getTypeByProperty, getOperateByType} from './Filter.jsx';

class Filters extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			filters:[],
			// 只有在  isAndAndOr 为 false  使用
			relation: props.and
		}
	}

	emptyFilterStructure(){
		let emptySct = {
			property: {
				key: '',
				name: '',
				types: []
			},
			type: {
				key: '',
				name: ''
			},
			operate: {
				key: '',
				name: ''
			},
			valueInput: {
				value: []
			},
			key: `filter-${new Date().getTime()}`
		}
		if(this.props.isAndAndOr){
			emptySct.relation = this.props.and;
		}
		return emptySct;
	}

	onChangeValueInput(){
		let json = this.props.isAndAndOr ? this.state.filters : this.state;
		this.props.onChangeValueInput(json);
	}

	filterStartOnClick(){
		this.setState({filters: [this.emptyFilterStructure()]})
	}

	componentDidMount(){
		this.setState({filters: [this.emptyFilterStructure()]});
	}

	_getNextAndIndex(activeIndex){
		let me = this, nextAndIndex = -1, filters = me.state.filters;
		let and = this.props.and;

		for(let i = 0; i < filters.length; i ++){
			let item = filters[i];
			if(i > activeIndex && item.relation === and){
				nextAndIndex = i;
				break;
			}
		}

		if(nextAndIndex === -1){
			nextAndIndex = me.state.filters.length;
		}
		return nextAndIndex;
	}

	AndButtonOnclick(indexFilter) {
		let me = this, filter = this.emptyFilterStructure();
		this.state.filters.splice(this._getNextAndIndex(indexFilter), 0, filter);
		this.setState({filters: this.state.filters});
	}

	OrButtonOnclick(indexFilter) {
		let filter = this.emptyFilterStructure();
		filter.relation = this.props.or;
		this.state.filters.splice(indexFilter + 1, 0, filter);
		this.setState({filters: this.state.filters});
	}

	DelButtonOnclick(indexFilter) {
		if(this.props.isAndAndOr){
			// 删除当前 和 知道下一个 and 之间的 or
			let delCounts = this._getNextAndIndex(indexFilter) - indexFilter;
			this.state.filters.splice(indexFilter, delCounts);
		}else{
			// 删除当前
			this.state.filters.splice(indexFilter, 1);
		}
		this.setState({filters: this.state.filters});
	}

	onRelationChange(relation){
		this.state.relation = relation;
		this.setState(this.state);
		this.onChangeValueInput();
	}

	onPropertyChange(filterIndex, property){
		const me = this, type = getTypeByProperty(property, this.props.typeMap);
		me.state.filters[filterIndex].property = property;
		me.state.filters[filterIndex].type = type;
		me.state.filters[filterIndex].operate = getOperateByType(type, this.props.typeMap);
		me.setState({filters: me.state.filters});
	}

	onTypeChange(filterIndex, type){
		this.state.filters[filterIndex].type = type;
		this.state.filters[filterIndex].operate = getOperateByType(type, this.props.typeMap);
		this.setState({filters: this.state.filters});
	}

	onOperateChange(filterIndex, operate){
		this.state.filters[filterIndex].operate = operate;
		this.setState({filters: this.state.filters});
	}

	onValueInputChange(filterIndex, valueInput){
		this.state.filters[filterIndex].valueInput = valueInput;
		this.setState(this.state);
		this.onChangeValueInput();
	}

	render() {
		let me = this;
		const {props, state} = this;
		const {isAndAndOr, propertyList, valueInputList, typeMap, containerWidth,
			and, or,
			relationRadioStyle, timeFormat} = props;
		let {relationWidth} = props;

		let $filters = state.filters.map(function (o, i) {
			return <Filter
				ref={`filter-${i}`}
				key={`filter-${o.key}`}
				filterIndex={i}
				containerWidth={containerWidth}
				relationWidth={relationWidth}
				isAndAndOr={isAndAndOr}
				relation={isAndAndOr ? o.relation : state.relation}
				property={o.property}
				type={o.type}
				operate={o.operate}

				and={and}
				or={or}
				relationRadioStyle={relationRadioStyle}
				timeFormat={timeFormat}

				emptyFilterStructure={me.emptyFilterStructure()}
				AndButtonOnclick={me.AndButtonOnclick.bind(me)}
				OrButtonOnclick={me.OrButtonOnclick.bind(me)}
				DelButtonOnclick={me.DelButtonOnclick.bind(me)}

				onRelationChange={me.onRelationChange.bind(me)}
				onPropertyChange={me.onPropertyChange.bind(me)}
				onTypeChange={me.onTypeChange.bind(me)}
				onOperateChange={me.onOperateChange.bind(me)}
				onValueInputChange={me.onValueInputChange.bind(me)}

				propertyList={propertyList}
				valueInputList={valueInputList}
				typeMap={typeMap}
				/>;
		});

		if($filters.length === 0){
			$filters = <Button onClick={this.filterStartOnClick.bind(this)}>事件筛选条件</Button>
		}

		const rootCls = {
			['filtersParent']: 1,
			['filtersAndAndOr']: isAndAndOr,
			['filtersAndOrOr']: !isAndAndOr
		};
		return (
			<div className={classnames(rootCls)} style={{width: containerWidth}}>
				{$filters}
			</div>
		)
	}
}

Filters.propTypes = {
	onChangeValueInput: PropTypes.func.isRequired,
	getJsonQueryData: PropTypes.func,
	propertyList: PropTypes.func.isRequired,
	typeMap: PropTypes.any.isRequired,
	valueInputList: PropTypes.func
}

Filters.defaultProps = {
	isAndAndOr: 1,
	containerWidth: 950,
	relationWidth: 50,
	and: '并且',
	or: '或者',
	timeFormat: 'yyyy-MM-dd HH:mm:ss',
	relationRadioStyle: {width:35, padding: '0 4px', fontSize: 12}
};

export default Filters;