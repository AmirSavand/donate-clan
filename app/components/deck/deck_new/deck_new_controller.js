"use strict";

app.controller("DeckNewController", function (API, Main, Deck, Card, DeckList, toaster,
  $scope, $state, $stateParams, $http, $window) {

  /**
   * Set dynamic width of card slots
   */
  function updateSlotsElementWith() {
    angular.element(".slots").width(angular.element(".slots + .row").width());
  }

  /**
   * Move all the cards from available cards into the deck
   *
   * @param {Array<Card>} cards
   */
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

  /**
   * Import cards from localStorage
   */
  function loadCardsLocally() {
    angular.forEach($scope.localCards, function (card) {
      $scope.cards.push(
        new Card(
          card._id, card.idName, card.name, card.arena, card.description,
          card.elixirCost, card.order, card.rarity, card.type
        )
      );
    });
  }

  function constructor() {

    /**
     * Saving (new deck) or updating (existing deck) a deck
     */
    $scope.isNewDeck = true;

    /**
     * Given deck by the route param
     * Used for editing a deck from outside
     *
     * @type {Deck}
     */
    $scope.preDeck = $stateParams.deck;

    /**
     * Available cards to build deck with
     *
     * @type {Array<Card>}
     */
    $scope.cards = [];

    /**
     * Available cards in localStorage
     *
     * @type {Array<object>}
     */
    $scope.localCards = localStorage.cards ? JSON.parse(localStorage.cards) : [];

    /**
     * Current deck being built
     *
     * @type {Deck}
     */
    $scope.deck = new Deck("My New Deck", []);

    /**
     * Number of slots for viewing purpose
     *
     * @type {Array}
     */
    $scope.slots = new Array(8);

    /**
     * All type of decks
     *
     * @type {Array<string>}
     */
    $scope.deckTypes = Main.deck.type;

    /**
     * Filters for available cards
     *
     * @type {Array}
     */
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

    /**
     * Order of available cards
     *
     * @type {string}
     */
    $scope.orderBy = "elixirCost";

    loadCardsLocally();
    updateSlotsElementWith();
  }

  /**
   * Generate random deck via API
   */
  $scope.generateDeck = function () {
    $scope.generating = true;
    API.RandomDeck.query({}, function (data) {
      $scope.deck.cards = [];
      syncDeckWithCards(data);
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

  angular.element($window).bind("resize", updateSlotsElementWith);

  $scope.$on("royaleClan.MainController:loadedCards", function (event, data) {
    $scope.localCards = data;
    loadCardsLocally();
  });

  constructor();
});
