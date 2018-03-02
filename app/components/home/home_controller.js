"use strict";

app.controller("HomeController", function (Member, Deck, Card, API, $scope) {

  function constructor() {

    /**
     * @type {Deck}
     */
    $scope.deck = new Deck("Generated Deck", []);

    /**
     * @type {Array<Member>}
     */
    $scope.members = [];

    // Get members
    API.Clan.get({ keys: "members" }, function (data) {
      angular.forEach(data.members, function (member) {
        $scope.members.push(new Member(member));
      });
    });

    // Get users
    API.Users.get({}, function (data) {
      $scope.users = data.results;
    });

    // Get random deck
    $scope.generateDeck();
  }

  /**
   * Generate random deck from API
   */
  $scope.generateDeck = function () {
    $scope.generating = true;

    API.RandomDeck.query({}, function (data) {
      $scope.generating = false;
      $scope.deck.cards = [];

      angular.forEach(data, function (card) {
        $scope.deck.addCard(new Card(
          card._id, card.idName, card.name, card.arena, card.description,
          card.elixirCost, card.order, card.rarity, card.type
        ));
      });
    });
  };

  constructor();
});
