angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, userService){

  $scope.Auth = userService;

  $scope.Auth.auth.$onAuth(function(authData){
    $scope.authData = authData;
  });

    //login method for login btn
    //if login successfully, navigate to votes list
    //otherwise, display error message
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

.controller('TodoCtrl', function($scope, currentAuth, todoService, $ionicModal, $ionicLoading) {

  $scope.todoService = todoService;
  $scope.email = currentAuth.password.email;
  $scope.onload = false;

  $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  }).then(function(modal){
    $scope.modal = modal;
  });

  $scope.showLoading = function(){
    $ionicLoading.show({template: "Trying hard to load data ..."});
  }

  $scope.hideLoading = function(){
    $ionicLoading.hide();
  }

  $scope.openModal = function(){
    $scope.form = {};
    $scope.modal.show();
  }

  $scope.closeModal = function(){
    $scope.modal.hide();
  }

  $scope.$on('$destory', function(){
    $scope.modal.remove();
  });

  $scope.$on('modal.hidden', function(){
    //$scope.clean();
    //$scope.modal.remove();
  });

  $scope.$on('modal.removed', function(){
  });

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

  $scope.change = function(index, state){
    console.log(index, state);
    $scope.todoService.change(index, state).then(function(response){
      console.log(response.data);
    });
  }

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

.controller('AccountCtrl', function($scope, $state, currentAuth, userService, $ionicHistory) {

  $scope.userService = userService;
  $scope.email = currentAuth.password.email;

  $scope.logout = function(){
    $scope.userService.logout();
    $ionicHistory.clearCache().then(function(){
      $state.go("login", {}, {reload: true});
    });
  }
});
