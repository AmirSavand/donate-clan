"use strict";

app.controller("DeckNewController", function (Deck, Card, DeckList, toaster,
  $scope, $state, $stateParams, $http, $window) {

  function constructor() {

    $scope.index = DeckList.get($stateParams.index) ? $stateParams.index : null;

    $scope.preDeck = $stateParams.deck;

    $scope.cards = [];

    $scope.localCards = localStorage.cards ? JSON.parse(localStorage.cards) : [];

    $scope.deck = new Deck("My New Deck", []);

    $scope.slots = new Array(8);

    $scope.orderBy = "elixirCost";

    $scope.filters = [{
      key: "elixirCost",
      label: "Elixir"
    }, {
      key: "raritySort",
      label: "Rarity"
    }, {
      key: "typeSort",
      label: "Type"
    }];

    importLocalCards();

    setSlots();
  }

  function setSlots() {
    angular.element(".slots").width(angular.element(".slots + .row").width());
  }

  function setupViewingDeck() {
    // If viewing/editing a deck
    if ($scope.index) {
      var viewingDeck = DeckList.get($scope.index);
      $scope.deck = new Deck().import(viewingDeck.name, viewingDeck.cards);

      // Setup cards to replace from availables
      var cardsToReplace = $scope.deck.cards;
      $scope.deck.cards = [];
      syncDeckWithCards(cardsToReplace);
    }

    if ($scope.preDeck) {
      syncDeckWithCards($scope.preDeck.cards);
    }
  }

  function importLocalCards() {
    angular.forEach($scope.localCards, function (card) {
      $scope.cards.push(
        new Card(
          card._id, card.idName, card.name, card.arena, card.description,
          card.elixirCost, card.order, card.rarity, card.type
        )
      );
    });
    setupViewingDeck();
  }

  function syncDeckWithCards(cards) {
    // Loop in the generated deck
    angular.forEach(cards, function (data) {
      // Loop in available cards
      angular.forEach($scope.cards, function (card, i) {
        // Find it in card collection
        if (card.idName === data.idName) {
          // Add it to the deck
          $scope.deck.addCard($scope.cards[i]);
        }
      });
    });
  }

  $scope.generateDeck = function () {
    $scope.generating = true;
    $http.get("http://www.clashapi.xyz/api/random-deck").then(function (data) {
      $scope.deck.cards = [];
      syncDeckWithCards(data.data);
      $scope.generating = false;
    });
  };

  $scope.save = function () {
    if (!$scope.deck.cards.length) {
      return toaster.error("Unable to Save", "You need to select atleast 1 card.");
    }
    DeckList.save($scope.deck, $scope.index);
    if (!$scope.index) {
      toaster.success("Awesome", $scope.deck.name + " is in your collection now.");
    } else {
      toaster.info("Updated", $scope.deck.name + " is updated.");
    }
    $state.go("app.deck-list");
  };

  angular.element($window).bind("resize", setSlots);

  $scope.$on("royaleClan.MainController:loadedCards", function (event, data) {
    $scope.localCards = data;
    importLocalCards();
  });

  constructor();
});
