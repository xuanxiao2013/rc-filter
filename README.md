# react-filter

## 效果预览
<img src="./doc/filter.demo.png" />

## 安装流程

``` bash
# 安装依赖
npm i --registry=https://registry.npm.taobao.org

# 启动 dev server:
# http://localhost:12345 (需手动更新)
# http://localhost:12345/webpack-dev-server/ (可自动更新)

npm run dev
```

## API

### props

| name     | description    | type     | default      |
|----------|----------------|----------|--------------|
|filters | 还原的时候的数据 | Array | [] |
|isAndAndOr | 并且或者或者都有，还是二选一 | Boolean | true |
|containerWidth | 容器宽度 | Number | 950 |
|relationWidth | 并且或者区域的宽度, 如果是二选一需要设置宽度 | Number | 50 |
|and | 操作符 | String | 并且 |
|or | 操作符 | String | 或者 |
|timeFormat | 时间格式 | String | yyyy-MM-dd HH:mm:ss |
|relationRadioStyle | 并且或者区域的样式 | Object |  |
|firstRelationTxt | 第一个并且或者区域的文字 | String | 筛选 |
|typeMap | 操作符 | Object |  |
|propertyList | 属性请求接口 | Object |  |
|valueInputList | 值请求接口 | String |  |
|onChangeValueInput | 输入框值变化回调 | Function |  |
	
### valueInput 类型

* 空: Empty 
* 多选下拉: MulSelect 
* 字符输入框: stringInput 
* 数值输入框: numberInput 
* 数值区间输入框: numberInputRange 
* 时间框: timeInput 
* 时间区间框: timeInput 
