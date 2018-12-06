"use strict";

app.controller("HomeController", function (Main, Account, Activity, Comment, Deck, Card, API, $scope) {

  function constructor() {

    /**
     * @type {Deck}
     */
    $scope.deck = new Deck("Generated Deck", []);

    /**
     * @type {Comment}
     */
    $scope.comment = new Comment({
      target: "Home", // For home page
      kind: Main.comment.kind.indexOf("Page") // Page comment
    });

    /**
     * @type {Array<Account>}
     */
    $scope.users = [];

    /**
     * @type {Array<Activity>}
     */
    $scope.activities = [];

    /**
     * @type {Array<Comment>}
     */
    $scope.comments = [];

    // Get users
    API.Users.get({ limit: 10 }, function (data) {
      angular.forEach(data.results, function (result) {
        $scope.users.push(new Account(result));
      });
    });

    // Get activities
    API.Activities.get({ limit: 20 }, function (data) {
      angular.forEach(data.results, function (result) {
        $scope.activities.push(new Activity(result));
      });
    });

    // Get comments
    API.Comments.get({
        limit: 30,
        target: $scope.comment.target,
        kind: $scope.comment.kind
      },
      function (data) {
        angular.forEach(data.results, function (result) {
          $scope.comments.push(new Comment(result));
        });
      }
    );

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

  $scope.$on("royalePlus.Comment:create", function (event, data) {
    $scope.comments.unshift(new Comment(data));
  });

  constructor();
});
