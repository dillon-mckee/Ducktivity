var combineReducers = require('redux').combineReducers;
var taskCategory = require('./TaskCategory');

var rootReducer = combineReducers({
		cardList: taskCategory,
 });


module.exports = rootReducer;
