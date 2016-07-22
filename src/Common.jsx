
const EMPTY_VALUR_FILTER = 'Empty',
	MUL_SELECT_VALUE_FILTER = 'MulSelect',
	STRING_INPUT_VALUE_FILTER = 'stringInput',
	NUMBER_INPUT_VALUE_FILTER = 'numberInput',
	NUMBER_INPUT_RANGR_VALUE_FILTER = 'numberInputRange',
	TIME_INPUT_VALUE_FILTER = 'timeInput',
	TIME_INPUT_RANGE_VALUE_FILTER = 'timeInputRange';

function isNotEmptySelect(key) {
	return (String(key).length > 0 || (Array.isArray(key) && key.length > 0))
}

function getFirstObjByArray(array) {
	return array && Array.isArray(array) && array.length > 0 ? array[0] : null;
}

function isNumber(obj) {
	obj = Number(obj);
	return !isNaN(obj) && Object.prototype.toString.call(obj) == '[object Number]';
}

export {
	EMPTY_VALUR_FILTER,
	MUL_SELECT_VALUE_FILTER,
	STRING_INPUT_VALUE_FILTER,
	NUMBER_INPUT_VALUE_FILTER,
	NUMBER_INPUT_RANGR_VALUE_FILTER,
	TIME_INPUT_VALUE_FILTER,
	TIME_INPUT_RANGE_VALUE_FILTER,

	isNumber,
	isNotEmptySelect,
	getFirstObjByArray
}