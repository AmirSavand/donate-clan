"use strict";

app.controller("DeckListController", function (DeckList, Deck, toaster, $scope) {

  function constructor() {

    $scope.decks = [];

    angular.forEach(DeckList.get(), function (deck, i) {
      var pushedIndex = $scope.decks.push(new Deck().import(deck.name, deck.cards));
      $scope.decks[pushedIndex - 1].index = i;
    });
  }

  $scope.remove = function (card) {
    DeckList.remove(card.index);
    toaster.info("Deleted", card.name + " is deleted.");
    constructor();
  };

  constructor();
});
