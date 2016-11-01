var actions = require("../actions/TaskCategory");
var data = require('./dataSample');

var initialState = {
	task: [],
	userId: ""
};

var newTask;

var taskCategory = function(state, action) {
		state = state || initialState;

	if(action.type === actions.FETCH_TASKS_SUCCESS) {
		console.log("fetch task recieved in reducer", action.data)
		// var newState = Object.assign({}, state, {
		// 				taskTitle: action.data.title
		// });
				// return newState;
				return data;
		}
	else if (action.type === actions.FETCH_TASKS_ERROR) {
		return action.error

	}

	else if (action.type === actions.UPDATE_TASKS_SUCCESS) {
		console.log("add task/update success in reducer", action.data)
		return state;
	}

	else if (action.type === actions.UPDATE_TASKS_ERROR) {
		return action.error
	}
	else if (action.type === actions.FETCH_USER_SUCCESS) {
		console.log("add USER success in reducer", action.data.categories)
		state = Object.assign({}, state, {
			task: action.data.categories,
			userId: action.data.googleID
		});

		console.log('fetch user success', state);
		return state;
	}

	else if (action.type === actions.FETCH_USER_ERROR) {
		return action.error
	}

	else if (action.type === actions.POST_DATA_SUCCESS) {
		console.log("POST SUCCESS", action.data)
		// console.log('state tasks', state.task);

		// for(var i = 0; i < state.task.length; i++) {
		// 	if (action.data.category == state.task[i]._id){
		// 	 state.task[i].cards.push(action.data);
		// 	}
		// 	state = Object.assign({}, state, {
		// 	task: state.task
		// });
		// }
		
		
		// console.log('state task', state.task);
		return state;
	}

	else if (action.type === actions.POST_DATA_ERROR) {
		return action.error
	}



	console.log('TaskCategory state', state);
	return state;

};

module.exports = taskCategory;
