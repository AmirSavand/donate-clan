"use strict";

app.controller("UserController", function (Member, API, $scope, $stateParams) {

  function constructor() {
    $scope.user = $stateParams.user;

    if (!$scope.user) {
      API.Users.get({ username: $stateParams.username }, function (data) {
        $scope.user = data;

        if ($scope.user.member) {
          $scope.user.member = new Member($scope.user.member);
        }
      });
    }
  }

  constructor();
});
