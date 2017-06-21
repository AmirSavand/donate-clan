"use strict";

app.controller("CardController", function (card, $scope) {

  function constructor() {
    $scope.card = card;
  }

  constructor();
});
