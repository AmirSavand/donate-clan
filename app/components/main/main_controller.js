"use strict";

app.controller("MainController", function (Auth, API, $scope, $rootScope, $state) {

  function constructor() {
    // Get state
    $scope.state = $state;

    // Get auth
    $scope.auth = Auth;
    $scope.user = Auth.getAuth();

    // Get cards
    if (!localStorage.getItem("cards")) {
      API.Cards.query({}, function (data) {
        localStorage.setItem("cards", JSON.stringify(data));
        $rootScope.$broadcast("royaleClan.MainController:loadedCards", data);
      });
    }
  }

  // Update auth
  $scope.$on("royaleClan.Auth:setAuth", constructor);

  constructor();
});
