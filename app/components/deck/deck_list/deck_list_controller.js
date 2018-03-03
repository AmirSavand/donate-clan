"use strict";

app.controller("DeckListController", function (API, Deck, toaster, $scope, $state, $stateParams) {

  function constructor() {

    $scope.params = $stateParams;

    /**
     * All decks to show
     *
     * @type {Array<Deck>}
     */
    $scope.decks = [];

    /**
     * APY payload
     *
     * @type {object}
     */
    var payload = {};

    /**
     * If there's user in URL param, then update payload
     */
    if ($stateParams.username) {
      payload.user = $stateParams.username;
    }

    /**
     * Load decks using payload
     */
    API.Decks.get(payload,
      function (data) {
        angular.forEach(data.results, function (result) {
          $scope.decks.push(new Deck().import(result));
        });
      },
      function () {
        toaster.error("No Decks", payload.user + " doesn't have any decks.");
        $state.go("app.deck-list", { username: null });
      }
    );
  }

  constructor();
});
