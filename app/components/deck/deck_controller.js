"use strict";

app.controller("DeckController", function (API, Deck, toaster, $scope, $state, $stateParams) {

  function constructor() {

    /**
     * @type {Deck}
     */
    $scope.deck = $stateParams.deck;

    /**
     * Get deck via API
     */
    if (!$scope.deck) {
      API.Decks.get({ id: $stateParams.id },
        function (data) {
          $scope.deck = new Deck().import(data);
        },
        function () {
          toaster.error("Unable to Access", "Deck doesn't exist or you don't have access to update it.", 10000);
          $state.go("app.deck-list");
        }
      );
    }
  }

  constructor();
});
