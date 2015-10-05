angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, userService){

  $scope.Auth = userService;

  $scope.Auth.auth.$onAuth(function(authData){
    $scope.authData = authData;
  });

    // login method for login btn
    // if login successfully, navigate to main list
    // otherwise, display error message
    $scope.login = function(){
      $scope.Auth.login($scope.email, $scope.passwd)
      .then(function(authData){
        $scope.authData = authData;
        $state.go("tab.todo");
      })
      .catch(function(error){
        $scope.error = error.toString();
        $scope.passwd = "";
      });
    }

})
// controller for user register view
.controller('SignupCtrl', function($scope, $state, userService){

  $scope.Auth = userService;
  $scope.form = {};

  $scope.signup = function(){
    //console.log($scope.form);
    if($scope.form.passwd1 != $scope.form.passwd2){
      $scope.error = "Retype password not match";
      return false;
    }
    $scope.Auth.add($scope.form.email, $scope.form.passwd1).then(function(userData){
      console.log("sign up success");
      $state.go("login");
    }).catch(function(error){
      $scope.error = error;
      $scope.form = {};
    });
  }
})
// controller for to-do list view
.controller('TodoCtrl', function($scope, currentAuth, todoService, $ionicModal, $ionicLoading) {
  
  // obtain user mail from router resovle service
  // set `onload` to false for ionic modal
  $scope.todoService = todoService;
  $scope.email = currentAuth.password.email;
  $scope.onload = false;

  // instantiate a ionic modal
  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modal){
    $scope.modal = modal;
  });

  // show loading effect while data is loading
  $scope.showLoading = function(){
    $ionicLoading.show({template: "Trying hard to load data ..."});
  }
  
  // hide loading effect
  $scope.hideLoading = function(){
    $ionicLoading.hide();
  }

  // open modal method
  $scope.openModal = function(){
    $scope.form = {};
    $scope.modal.show();
  }

  // close modal method
  $scope.closeModal = function(){
    $scope.modal.hide();
  }

  // remove the whole modal from DOM after the page is destoryed
  $scope.$on('$destory', function(){
    $scope.modal.remove();
  });

  // event handler for `model.hidden`
  $scope.$on('modal.hidden', function(){
    //$scope.clean();
    //$scope.modal.remove();
  });

  $scope.$on('modal.removed', function(){
  });

  // handler for delete a to-do item
  $scope.delete = function(index, position){
    $scope.showLoading();
    console.log(index);
    $scope.todoService.delete(index).then(function(response){
      console.log(response.data.success);
      if(response.data.success){
        $scope.todos.splice(position, 1);
        if($scope.todos.length == 0)
          $scope.hint="No todo item in your list. Please add some.";
        else
          $scope.hint = null;
        $scope.hideLoading();
      }
    }, function(error){
      console.log(error);
    });
  };

  // handler for change the state of an item
  $scope.change = function(index, state){
    console.log(index, state);
    $scope.todoService.change(index, state).then(function(response){
      console.log(response.data);
    });
  }

  // handler for refresh the view if it is necessary
  $scope.refresh = function(){
    $scope.showLoading();
    $scope.todoService.all($scope.email).then(function(response){
      if(response.data.empty){
        $scope.hint = "No todo item in your list. Please add some.";
        $scope.hideLoading();
      }
      else{
        $scope.hint = null;
        $scope.todos = response.data;
        $scope.hideLoading();
      }
    }, function(error){
      console.log(error);
    });
  }

  // handler for create a new item
  $scope.create = function(form){
    console.log($scope.form);
    $scope.onload = true;
    $scope.showLoading();
    
    $scope.todoService.create($scope.email, form).then(function(response){
      console.log(response);
      if(response.data.success){
        console.log(response.data.success);
        if(!$scope.todos)
          $scope.todos = response.data.success;
        else
          $scope.todos.push(response.data.success);
        $scope.onload = false;
        $scope.hint = null;
        $scope.closeModal();
        $scope.hideLoading();
      }
    }, function(error){
      console.log(error);
      $scope.closeModal();
      $scope.hideLoading();
    });

  }

  $scope.cancel = function(){
    $scope.closeModal();
  }

  $scope.showLoading();

  // load all the to-do item for a user when page is first loaded
  $scope.todoService.all($scope.email).then(function(response){
    console.log(response.data);
    if(response.data.empty){
      $scope.hint = "No todo item in your list. Please add some.";
      $scope.hideLoading();
    }
    else{
      $scope.hint = null;
      $scope.todos = response.data;
      $scope.hideLoading();
    }
  }, function(error){
    console.log(error);
    $scope.hideLoading();
  });
})
// controller for account view
.controller('AccountCtrl', function($scope, $state, currentAuth, userService, $ionicHistory) {

  $scope.userService = userService;
  $scope.email = currentAuth.password.email;

  // handler for user log-out
  $scope.logout = function(){
    $scope.userService.logout();
    $ionicHistory.clearCache().then(function(){
      $state.go("login", {}, {reload: true});
    });
  }
});
