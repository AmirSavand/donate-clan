"use strict";

app.controller("SettingsController", function (Auth, API, $scope, $state) {

  function constructor() {

    // Get auth
    $scope.user = Auth.getAuth();
  }

  constructor();
});
