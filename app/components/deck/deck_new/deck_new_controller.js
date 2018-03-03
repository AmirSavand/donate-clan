"use strict";

app.controller("DeckNewController", function (Auth, API, Main, Deck, Card, toaster,
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

  /**
   * Check and validate deck
   *
   * @returns {bool}
   */
  function isDeckValidToSave() {
    // Deck full of cards
    if ($scope.deck.cards.length !== 8) {
      toaster.error("Unable to Save", "You need to select 8 cards.");
      return false;
    }
    // Set default deck type if not set
    if ($scope.deck.type === -1) {
      $scope.deck.type = $scope.deckTypes.indexOf("None");
    }
    return true;
  }

  function constructor() {

    /**
     * Saving (new deck) or updating (existing deck) a deck
     */
    $scope.isNewDeck = !$stateParams.id;

    /**
     * Loading state to disallow user to save, update or generate deck
     */
    $scope.loading = false;

    /**
     * Given deck by the route param
     * Used for editing a deck from outside
     *
     * @type {Deck}
     */
    $scope.copiedDeck = $stateParams.deck;

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

    /**
     * Load editing deck
     */
    if ($scope.copiedDeck) {
      $scope.deck = $scope.copiedDeck;
    }

    /**
     * Edit deck by given id in params (if instance is not givin in params)
     */
    if ($stateParams.id && !$scope.copiedDeck) {
      $scope.loading = true;
      // Get deck by id and username
      API.Decks.get({ id: $stateParams.id, user: Auth.getAuth().username },
        function (data) {
          $scope.deck = new Deck().import(data);
        },
        function () {
          toaster.error("Unable to Access", "Deck doesn't exist or you don't have access to update it.", 10000);
          $state.go("app.deck-list");
        }
      );
    }

    loadCardsLocally();
    updateSlotsElementWith();
  }

  /**
   * Generate random deck via API
   */
  $scope.generateDeck = function () {
    $scope.loading = true;
    API.RandomDeck.query({}, function (data) {
      $scope.deck.cards = [];
      syncDeckWithCards(data);
      $scope.loading = false;
    });
  };

  /**
   * Save the deck
   */
  $scope.save = function () {

    // Validate
    if (!isDeckValidToSave()) {
      return;
    }

    // Save the deck
    API.Decks.save($scope.deck.export(), function (data) {
      toaster.success("Awesome", $scope.deck.name + " is in your collection now.");
      $state.go("app.deck-list", { username: data.user });
    });
  };

  /**
   * Update the deck
   */
  $scope.update = function () {

    // Validate
    if (!isDeckValidToSave()) {
      return;
    }


    // Update the deck
    API.Decks.put({ id: $scope.deck.id }, $scope.deck.export(), function (data) {
      toaster.success("Done", $scope.deck.name + " updated.");
      $state.go("app.deck", { deck: $scope.deck, id: $scope.deck.id });
    });
  };

  /**
   * Update dynamic with of slots when window.resize
   */
  angular.element($window).bind("resize", updateSlotsElementWith);

  /**
   * Reload cards when they are updated after loading them
   */
  $scope.$on("royaleClan.MainController:loadedCards", function (event, data) {
    $scope.localCards = data;
    loadCardsLocally();
  });

  constructor();
});
