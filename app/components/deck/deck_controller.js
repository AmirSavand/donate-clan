"use strict";

app.controller("DeckController", function (API, Deck, toaster, $scope, $stateParams) {

  function constructor() {

    /**
     * @type {Deck}
     */
    $scope.deck = $stateParams.deck;

    /**
     * Get deck via API
     */
    if (!$scope.deck) {
      API.Decks.get({ id: $stateParams.id }, function (data) {
        $scope.deck = new Deck().import(data);
      });
    }
  }

  constructor();
});
