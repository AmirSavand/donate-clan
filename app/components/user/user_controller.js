"use strict";

app.controller("UserController", function (Member, API, $scope, $stateParams) {

  function constructor() {

    // Get user from param
    $scope.user = $stateParams.user;

    // Get user from API
    if (!$scope.user) {
      API.Users.get({ username: $stateParams.username }, function (data) {
        $scope.user = data;
      });
    }
  }

  constructor();
});
