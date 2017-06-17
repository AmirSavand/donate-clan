"use strict";

app.controller("MainController", function ($scope, $rootScope, $state, $http) {

  function constructor() {
    $scope.state = $state;
    $scope.version = "0.4.2";

    if (!localStorage.cards) {
      $http.get("http://www.clashapi.xyz/api/cards").then(function (data) {
        localStorage.cards = JSON.stringify(data.data);
        $rootScope.$broadcast("royaleClan.MainController:loadedCards", data.data);
      });
    }
  }

  constructor();
});
