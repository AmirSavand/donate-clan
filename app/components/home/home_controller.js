"use strict";

app.controller("HomeController", function (Member, Deck, Card, API, $scope) {

  function constructor() {

    $scope.members = [];

    $scope.deck = new Deck("Generated Deck", []);

    // Get members
    API.Members.get({}, function (data) {
      angular.forEach(data.results, function (result) {
        // Instantiate a member
        $scope.members.push(new Member(result));
      });
    });

    // Get random deck
    $scope.generateDeck();
  }

  $scope.generateDeck = function () {
    $scope.generating = true;

    // Get a random deck
    API.RandomDeck.query({}, function (data) {
      $scope.generating = false;
      $scope.deck.cards = [];

      angular.forEach(data, function (card) {
        // Instantiate a card
        $scope.deck.addCard(
          new Card(
            card._id, card.idName, card.name, card.arena, card.description,
            card.elixirCost, card.order, card.rarity, card.type
          )
        );
      });
    });
  };

  constructor();
});
