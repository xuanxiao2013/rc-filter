import React from 'react';
import ReactDOM from 'react-dom';
import Filters from '../src/index.jsx';

import {
  EMPTY_VALUR_FILTER,
  MUL_SELECT_VALUE_FILTER,
  STRING_INPUT_VALUE_FILTER,
  NUMBER_INPUT_VALUE_FILTER,
  NUMBER_INPUT_RANGR_VALUE_FILTER,
  TIME_INPUT_VALUE_FILTER,
  TIME_INPUT_RANGE_VALUE_FILTER
} from '../src/Common.jsx';


const
  STRING_TYPE = 'string',
  NUMBER_TYPE = 'number',
  TIME_TYPE = 'date',
  LIST_TYPE = 'list',
  BOOLEAN_TYPE = 'boolean';

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
  //operate: [EARLY_OPERATE_FILTER, LATER_OPERATE_FILTER, RANGE_OPERATE_FILTER]
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

function propertyList(){
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
      }
    ]
    resolve(items);
  });
}

function valueInputList(){
  return new Promise(function (resolve, reject) {
    let items = [];
    for (let i = 10; i < 36; i++) {
      items.push({
        key: i.toString(36) + i,
        name: i.toString(36) + i
      })
    }
    resolve(items);
  });
}


class DemoAnimate extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }
  render() {
    function onChangeValueInput(json){
      //console.log(json)
    }

    return <div className="filtersQuery">
      <Filters
        propertyList={propertyList}
        valueInputList={valueInputList}
        typeMap={TypeMap}
        onChangeValueInput={onChangeValueInput}
        />
      <Filters
        isAndAndOr={false}
        relationWidth={116}
        propertyList={propertyList}
        valueInputList={valueInputList}
        typeMap={TypeMap}
        onChangeValueInput={onChangeValueInput}
        />
    </div>
  }
}

ReactDOM.render(<DemoAnimate />, document.getElementById('bodyRoot'));
