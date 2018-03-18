"use strict";

app.controller("MainController", function (ENV, Auth, API, Account, $scope, $rootScope, $state) {

  /**
   * Get user data
   */
  function getUserData() {
    if (Auth.isAuth()) {
      API.Users.get({ username: Auth.getAuth().username }, function (data) {
        // Update data
        Auth.updateAuth(data, false);
        // Store data
        $scope.user = new Account(Auth.getAuth());
      });
    }
  }

  function constructor() {

    // Get auth
    $scope.auth = Auth;

    // Refresh auth
    getUserData();

    // Get state
    $scope.state = $state;

    // Get cards
    if (!localStorage.getItem("cards") || localStorage.getItem("version") != ENV.VERSION_STORAGE) {
      API.Cards.query({}, function (data) {
        localStorage.setItem("cards", JSON.stringify(data));
        localStorage.setItem("version", ENV.VERSION_STORAGE);
        $rootScope.$broadcast("royalePlus.MainController:loadedCards", data);
      });
    }
  }

  // Update user data
  $scope.$on("royalePlus.Auth:setAuth", getUserData);
  $scope.$on("royalePlus.Auth:updateAuth", getUserData);
  $scope.$on("royalePlus.Auth:unAuth", getUserData);

  constructor();
});
