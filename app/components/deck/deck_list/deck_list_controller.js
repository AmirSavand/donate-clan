"use strict";

app.controller("DeckListController", function (API, Deck, toaster, $scope, $stateParams) {

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
      payload.username = $stateParams.username;
    }

    /**
     * Load decks using payload
     */
    API.Decks.get(payload, function (data) {
      angular.forEach(data.results, function (result) {
        $scope.decks.push(new Deck().import(result));
      });
    });
  }

  $scope.remove = function (card) {
    toaster.info("Deleted", card.name + " is deleted.");
    constructor();
  };

  constructor();
});
