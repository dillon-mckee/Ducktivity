require('isomorphic-fetch');
var Cookies = require("js-cookie");
var Constants = require("../constants/CardCategoriesConstants");


var fetchUser = function() {
   return function(dispatch) {
    var token = Cookies.get('accessToken');
    // var token = getToken();
    console.log('token=', token);
    // const headers = new Headers();
    // headers.append('Authorization', `Bearer ` + token);
    var headers = new Headers({
        Authorization: 'bearer ' + token
      });
       var url = '/api/user/me';
       return fetch(url, {headers: headers}).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })
       .then(function(data) {
           return dispatch(
               Constants.fetchUserSuccess(data)
           );
       })
       .catch(function(error) {
           return dispatch(
               Constants.fetchUserError(error)
           );
       });
   }
};

var postCard = function(TaskConstruct, categoryId) {
   return function(dispatch) {
    var token = Cookies.get('accessToken');
       var url = '/api/card';
       return fetch(url, {
        method: 'post',
        headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
        body: JSON.stringify({
          TaskConstruct: TaskConstruct,
          categoryId: categoryId
        })
      }).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json(); 
       })
       .then(function(data) {
               console.log("POST DATA", data);
           return dispatch(
               fetchUser()
           );
       })
       .catch(function(error) {
           return dispatch(
               Constants.fetchUserError(error)
           );
       });
   }
};


//UPDATE + DELETE TASK DATA ACTION
var updateCards = function(CardConstruct, cardId) {
   return function(dispatch) {
        var token = Cookies.get('accessToken');
       var url = '/api/card/' + cardId;
       return fetch(url,
       {
          method: 'put',
         headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
          body: JSON.stringify({
          status: CardConstruct
        })


       }

        ).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })

       .then(function(data) {
           return dispatch(
               fetchUser()
           );
       })
       .catch(function(error) {
           return dispatch(
               Constants.fetchUserError(error)
           );
       });
   }
};


// var MOVE_TASKS_SUCCESS = 'MOVE_TASKS_SUCCESS';
// var moveTasksSuccess = function(data) {
//     return {
//         type: MOVE_TASKS_SUCCESS,
//         data: data
//     };
// };
// var MOVE_TASKS_ERROR= 'MOVE_TASKS_ERROR';
// var moveTasksError = function(error) {
//     return {
//         type: UPDATE_TASKS_ERROR,
//         error: error
//     };
// };


// var moveTasks = function(task, category, userId) {
//    return function(dispatch) {
//        var url = '/api/' + userId;
//        return fetch(url,
//        {
//           method: 'put',
//           headers: {'Content-type': 'application/json'},
//           body: JSON.stringify({
//           moveTask: task,
//           originalCategory: category
//         })


//        }

//         ).then(function(response) {
//            if (response.status < 200 || response.status >= 300) {
//                var error = new Error(response.statusText);
//                error.response = response;
//                throw error;
//            }
//            return response.json();
//        })

//        .then(function(data) {
//                console.log("DATA", data);
//            return dispatch(
//                moveTasksSuccess(data)
//            );
//        })
//        .catch(function(error) {

//            return dispatch(
//                moveTasksError(error)
//            );
//        });
//    }
// };

var postCategory = function(CategoryConstruct, userId) {
   return function(dispatch) {
    var token = Cookies.get('accessToken');
       var url = '/api/category';
       return fetch(url, {
        method: 'post',
        headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
        body: JSON.stringify({
          CategoryConstruct: CategoryConstruct,
          userId: userId
        })
      }).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json(); 
       })
       .then(function(data) {
               console.log("POST DATA", data);
           return dispatch(
               fetchUser()
           );
       })
       .catch(function(error) {
           return dispatch(
              Constants.fetchUserError(error)
           );
       });
   }
};

//UPDATE/DELETE CATEGORY ACTION
var deleteCategory = function(categoryId) {
   return function(dispatch) {
        var token = Cookies.get('accessToken');
       var url = '/api/category/' + categoryId;
       return fetch(url,
       {
          method: 'delete',
         headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
          body: JSON.stringify({})
       }

        ).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })

       .then(function(data) {
           return dispatch(
              fetchUser()
           );
       })
       .catch(function(error) {
           return dispatch(
              Constants.fetchUserError(error)
           );
       });
   }
};



// for the user
exports.fetchUser = fetchUser;
exports.postCard = postCard;
exports.updateCards = updateCards;
exports.postCategory = postCategory;
exports.deleteCategory = deleteCategory;
